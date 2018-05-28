import { IConfigApi } from '@cian/config/shared';
import { HttpApi } from '@cian/http-api/node';
import { PageBuilderFactory } from '@cian/layout';
import { ServerLogger } from '@cian/logger/lib/node/server_logger';
import { IManifest } from '@cian/microservices-tools/manifest/shared';
import { IServer } from '@cian/microservices-tools/server';
import { ITelemetryLogger } from '@cian/microservices-tools/telemetry/shared';
import { mainpage } from './mainpage';

export interface IAppContext {
  server: IServer;
  config: IConfigApi;
  logger: ServerLogger;
  httpApi: HttpApi;
  manifest: IManifest;
  telemetryLogger: ITelemetryLogger;
  pageBuilderFactory: PageBuilderFactory;
}

export function attachPages(appContext: IAppContext) {
  mainpage(appContext);
}
