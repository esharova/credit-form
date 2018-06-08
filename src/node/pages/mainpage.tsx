import { createClientConfig, IClientConfig } from '@cian/config/node';
import { Page } from '@cian/layout';
import { IExpressRequestLikeObject } from '@cian/logger/lib/node/request_logger';
import { renderScriptAssets, renderStyleAssets } from '@cian/microservices-tools/manifest/node';
import { createGenerateClassName, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';

import { App } from '../../shared';
import { IAppContext } from './';

interface IUser {
    id?: string | string[];
}

export interface IPageContext {
    clientConfig: IClientConfig;
    headers: IncomingHttpHeaders;
    profileSessionKey: string;
    page: Page;
    user: IUser;
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
        preparePageContext: (req:
                                 Request) => {
            let user: IUser = {};
            const authHeader = req.headers['x-authenticated'];
            if (authHeader && authHeader === '1') {
                user.id = req.headers['x-real-userid'];
            }
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
                logger.error('Error', {err});
            });

            return Promise.all([pageBuilder.build(), clientRequest])
                .then(([page]) => {
                    return {
                        clientConfig,
                        headers: req.headers,
                        page,
                        profileSessionKey: req.header('x-profilesessionkey') || '',
                        user,
                    };
                });
        },
        render: (pageContext: IPageContext) => {
            const {clientConfig, headers, page, profileSessionKey, user} = pageContext;
            if (!user.id) {
                return {
                    body: '',
                    headers: [
                        ['Location', 'https://www.cian.ru/'],
                    ],
                    statusCode: 301,
                };
            }
            const sheetsRegistry = new SheetsRegistry();

            const generateClassName = createGenerateClassName();

            const html = renderToString(
                <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                    <MuiThemeProvider theme={createMuiTheme()}>
                        <App
                            httpApi={httpApi}
                            config={config}
                            logger={logger}
                            reactErrorLogger={logger}
                        />
                    </MuiThemeProvider>
                </JssProvider>,
            );
            // Render the component to a string.
            const css = sheetsRegistry.toString();

            page.setParameters({
                cianAnalyticsPageViewObject: {},
                documentTitle: 'Example page',
                performanceMetricsPageType: 'Example',
                performanceMetricsWebsiteType: 'Example',
                profileSessionKey,
            });

            page.writeHeaderHead();
            page.writeHead(`<!--${JSON.stringify(user)}-->`);
            page.writeHead(`<!--${JSON.stringify(headers)}-->`);
            page.writeHead(renderStyleAssets(manifest, config));
            page.writeFooterHead();

            page.writeHeaderBody();
            page.writeBody(`<style id="jss-server-side">${css}</style>`);
            page.writeBody(`<div id="credit-application-form-finance-frontend" style="flex: 1 1 auto;">${html}</div>`);
            page.writeBody(clientConfig.renderToHtml());

            page.writeBody(renderScriptAssets(manifest, config));
            page.writeFooterBody();

            return page.compile();
        },
    }));
}
