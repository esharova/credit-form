import { createClientConfig } from '@cian/config/browser';
import { HttpApi } from '@cian/http-api/browser';
import { createLogger } from '@cian/microservices-tools/logger/browser';
import { configureSentry } from '@cian/microservices-tools/sentry/browser';
import { clientTelemetry } from '@cian/microservices-tools/telemetry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '../shared/index';
import { createConfigSchema } from '../shared/schema';
import { createReactLogger } from './utils/browser_error_writer';

const schema = createConfigSchema();

const config = createClientConfig({
    schema,
    uniqueConfigKey: 'credit-application-form-finance-frontend',
});

config.load()
      .then((notFoundErrors: string[]) => {
          if (notFoundErrors.length > 0) {
              throw new Error('Config fields are missed: ' + notFoundErrors.join(', '));
          }

          return configureSentry(config, {
              matchUrl: (url) => {
                  const projectName = config.get<string>('projectName');

                  if (!projectName) {
                      throw new Error('Project name not found');
                  }

                  return url.indexOf(projectName) >= 0;
              },
          });
      })
      .then(() => {
          const telemetryLogger = clientTelemetry(config);

          const logger = createLogger(config);

          const httpApi = new HttpApi({
              config,
              logger,
              telemetry: {
                  ...telemetryLogger,
              },
          });

          const reactErrorLogger = createReactLogger({
              environment: config.get<string>('environment') || '',
              httpApi,
              projectName: config.get<string>('projectName') || 'undefined',
              release: config.get<string>('release') || '',
          });

          const rootElement = document.getElementById('credit-application-form-finance-frontend');

          if (!rootElement) {
              throw new Error('Unable to find element #credit-application-form-finance-frontend');
          }

          ReactDOM.hydrate(
              <App
                  httpApi={httpApi}
                  config={config}
                  logger={logger}
                  reactErrorLogger={reactErrorLogger}
              />,
              rootElement,
              () => {
              },
          );

      });
