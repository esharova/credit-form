import { IConfigApi } from '@cian/config/shared';
import { IHttpApi } from '@cian/http-api/shared/http';
import { ILogger } from '@cian/microservices-tools/logger/shared';

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';


import { PassportPage } from './pages/passport/passport';
import { store } from './reducers';
import { BackendApi } from './services/backendApi';
import { DadataAddressApi } from './services/dadataAddressApi';
import { logComponentError } from './utils/log_component_error';
import { PageLayout } from "./components/page-layout/page-layout";

export interface IContext {
    config: IConfigApi;
    httpApi: IHttpApi;
    logger: ILogger;
    reactErrorLogger: ILogger;
}

export interface IAppProps extends IContext {
}


export class App extends Component<IAppProps, object> {

    public static childContextTypes = {
        config: PropTypes.object,
        httpApi: PropTypes.object,
        logger: PropTypes.object,
        reactErrorLogger: PropTypes.object,
    };
    public context: IContext;
    private dadataAddressApi: DadataAddressApi;
    private backendApi: BackendApi;

    private routes = [
        {
            path: '/passport',
            render: this.renderPassportPage
        },
        {
            path: '/job',
            render: this.renderJobPage
        },
    ]

    public constructor(props: IAppProps) {
        super(props);
        this.dadataAddressApi = new DadataAddressApi();
        this.backendApi = new BackendApi(store);
        this.backendApi.loadData();
    }

    public getChildContext(): IContext {
        return {
            config: this.props.config,
            httpApi: this.props.httpApi,
            logger: this.props.logger,
            reactErrorLogger: this.props.reactErrorLogger,
        };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logComponentError({
            error,
            errorInfo,
            logger: this.props.reactErrorLogger,
        });
    }

    public render() {
        return (
            <Provider store={ store }>
                <Switch>
                    { this.routes.map(route => (
                        <Route exact={ true } path={ route.path } render={ () => (
                            <PageLayout content={ route.render() } />
                        ) } />
                    ))}
                </Switch>
            </Provider>
        );
    }

    renderPassportPage() {
        return (
            <PassportPage
                dadataAddressApi={ this.dadataAddressApi }
                backendApi={ this.backendApi }
            />
        );
    }

    renderJobPage() {
        return (
            <span> job info</span>
        );
    }
}
