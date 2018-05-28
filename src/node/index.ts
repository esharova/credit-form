import { createServerConfig } from '@cian/config/node';
import { HttpApi } from '@cian/http-api/node';
import { createPageBuilderFactory } from '@cian/layout';
import { ServerLogger } from '@cian/logger/lib/node/server_logger';
import { createServerLogger } from '@cian/microservices-tools/logger/node';
import { createManifest } from '@cian/microservices-tools/manifest/node';
import { createPolyfillsService } from '@cian/microservices-tools/polyfills/node';
import { createCpuProfiler } from '@cian/microservices-tools/profiling/node';
import { configureSentry } from '@cian/microservices-tools/sentry/node';
import { createServer } from '@cian/microservices-tools/server';
import { serverTelemetry } from '@cian/microservices-tools/telemetry/node';
import { createStatusPagesService } from '@cian/status-pages';
import { createConfigSchema } from '../shared/schema';
import { attachPages } from './pages';

const schema = createConfigSchema();

const config = createServerConfig(schema);

config.load()
  .then((notFoundErrors: string[]) => {
    configureSentry(config);

    const logger: ServerLogger = createServerLogger(config);

    logger.debug('Config fields are missed:', notFoundErrors);

    const profiler = createCpuProfiler(logger);

    const telemetryLogger = serverTelemetry(config, profiler.getMonitor());

    const httpApi = new HttpApi({
      config,
      logger,
      telemetry: {
        ...telemetryLogger,
      },
    });

    httpApi.runServiceDiscovery();

    const manifest = createManifest(config);

    const polyfillsService = createPolyfillsService(config, telemetryLogger);

    const pageBuilderFactory = createPageBuilderFactory({ httpApi, config, polyfillsService });

    const statusPagesService = createStatusPagesService(pageBuilderFactory);

    const server = createServer(config, logger, telemetryLogger, statusPagesService, profiler);

    return Promise.all([
      logger,
      httpApi,
      server,
      manifest,
      telemetryLogger,
      pageBuilderFactory,
      manifest.load(),
      polyfillsService.warmup(),
      statusPagesService.warmup(),
    ]);
  })
  .then(([logger, httpApi, server, manifest, telemetryLogger, pageBuilderFactory]) => {
    attachPages({
      config,
      httpApi,
      logger,
      manifest,
      pageBuilderFactory,
      server,
      telemetryLogger,
    });

    server.start();
  })
  .catch((error: Error) => {
    throw new Error(error.toString());
  });
