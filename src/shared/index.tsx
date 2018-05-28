import { IConfigApi } from '@cian/config/shared';
import { IHttpApi } from '@cian/http-api/shared/http';
import { ILogger } from '@cian/microservices-tools/logger/shared';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import * as React from 'react';
import { logComponentError } from './utils/log_component_error';

const style = require('./index.css');

export interface IContext {
  config: IConfigApi;
  httpApi: IHttpApi;
  logger: ILogger;
  reactErrorLogger: ILogger;
}

export interface IAppProps extends IContext {}

export class App extends Component<IAppProps, object> {

  public context: IContext;

  public static childContextTypes = {
    config: PropTypes.object,
    httpApi: PropTypes.object,
    logger: PropTypes.object,
    reactErrorLogger: PropTypes.object,
  };

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

    const test = this.props.config && this.props.config.get('feature.test');

    const title = test ? 'Hello World From Space! 🚀' : 'Hello World! 🚀';

    return (
      <div className={style['test']}>{title}</div>
    );
  }
}
