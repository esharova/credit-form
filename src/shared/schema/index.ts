import { createSchema, field, group } from '@cian/config/shared/schema';
import {
  consul, layout, manifest, ping, polyfills, runtime, sentry, server, telemetryBrowser, telemetryServer,
} from '@cian/config/shared/schema/default';
import { isBoolean, isString } from '@cian/microservices-tools/config/shared/schema/validators';

export function createConfigSchema() {
  return createSchema([
    consul,
    layout,
    manifest,
    ping,
    polyfills,
    runtime,
    sentry,
    server,
    telemetryServer,
    telemetryBrowser,
    group('feature', [
      field({
        name: 'test',
        validate: isBoolean,
      }),
    ]),
    group('ajaxLogError', [
      field({
        envName: 'AJAX_LOG_ERROR_BASE_PUBLIC_URL',
        isBrowser: true,
        name: 'baseUrl',
        validate: isString,
      }),
    ]),
  ]);
}
