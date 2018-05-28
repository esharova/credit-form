import { createClientConfig, IClientConfig } from '@cian/config/node';
import { Page } from '@cian/layout';
import { IExpressRequestLikeObject } from '@cian/logger/lib/node/request_logger';
import { renderScriptAssets, renderStyleAssets } from '@cian/microservices-tools/manifest/node';
import { Request } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../../shared/index';
import { IAppContext } from './index';

export interface IPageContext {
  clientConfig: IClientConfig;
  profileSessionKey: string;
  page: Page;
}

export function mainpage(appContext: IAppContext) {
  const {
    server,
    config,
    httpApi,
    manifest,
    logger,
    pageBuilderFactory,
  } = appContext;

  server.express.get('/', server.createPageHandler({
    preparePageContext: (req: Request) => {

      const client = httpApi.attachRequest(req);

      const requestLogger = logger.attach(req as IExpressRequestLikeObject);

      const clientConfig = createClientConfig(config, {
        customParams: {
          ajaxLogError: {
            baseUrl: config.get('ajaxLogError.baseUrl'),
          },
          feature: {
            test: config.get('feature.test'),
          },
          someValue: 'demo',
        },
        uniqueConfigKey: 'credit-application-form-finance-frontend',
      });

      const pageBuilder = pageBuilderFactory.create(req);

      pageBuilder.enableHeader({
        section: 'index',
        showGeolocation: false,
        showMobileAppBanner: false,
        style: 'adaptive',
        subdomain: 'www',
      });

      pageBuilder.enableFooter({
        section: 'index',
        style: 'adaptive',
      });

      const clientRequest = client.fetch({
        apiType: 'private',
        assertStatusCodes: [200],
        method: 'GET',
        microserviceName: 'layout.headerFragment',
        pathApi: '/_/ping',
      }).then(res => {
        requestLogger.debug('request', res);

        return res;
      }).catch(err => {
        logger.error('Error', { err });
      });

      return Promise.all([pageBuilder.build(), clientRequest])
        .then(([page]) => ({
          clientConfig,
          page,
          profileSessionKey: req.header('x-profilesessionkey') || '',
        }));
    },
    render: (pageContext: IPageContext) => {
      const { clientConfig, page, profileSessionKey } = pageContext;

      page.setParameters({
        cianAnalyticsPageViewObject: {},
        documentTitle: 'Example page',
        performanceMetricsPageType: 'Example',
        performanceMetricsWebsiteType: 'Example',
        profileSessionKey,
      });

      page.writeHeaderHead();
      page.writeHead(renderStyleAssets(manifest, config));
      page.writeFooterHead();

      page.writeHeaderBody();
      page.writeBody(`<div id="credit-application-form-finance-frontend" style="flex: 1 1 auto;">${renderToString(
        <App
          httpApi={httpApi}
          config={config}
          logger={logger}
          reactErrorLogger={logger}
        />,
      )}</div>`);
      page.writeBody(clientConfig.renderToHtml());
      page.writeBody(renderScriptAssets(manifest, config));
      page.writeFooterBody();

      return page.compile();
    },
  }));
}
