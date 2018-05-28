declare module 'appmetrics' {
  namespace appmetrics {
    interface IEnvironment {
      [key: string]: string;
    }

    interface ICpu {
      time: number;
      process: number;
      system: number;
    }

    interface IEventloop {
      time: number;
      latency: {
        min: number;
        max: number;
        avg: number;
      };
    }

    interface IGc {
      time: number;
      type: 'M' | 'S';
      size: number;
      used: number;
      duration: number;
    }

    interface ILoop {
      count: number;
      minimum: number;
      maximum: number;
      average: number;
    }

    interface IMemory {
      time: number;
      physical_total: number;
      physical_used: number;
      physical_free: number;
      virtual: number;
      private: number;
      physical: number;
    }

    interface IProfiling {
      time: number;
      functions: Array<{
        self: number;
        parent: number;
        name: string;
        file: string;
        line: number;
        count: number;
      }>;
    }

    interface IHttp {
      time: number;
      method: string;
      url: string;
      duration: number;
      header: string;
      contentType: string;
      requestHeader: object;
    }

    interface IHttpOutbound {
      time: number;
      method: string;
      url: string;
      contentType: string;
      statusCode: string;
      duration: number;
      requestHeaders: object;
    }

    interface IRequestEvent {
      type: string;
      name: string;
      context: object;
      stack: string;
      children: IRequestEvent[];
      duration: number;
    }

    interface IRequest {
      time: number;
      type: string;
      name: string;
      request: IRequestEvent;
      duration: number;
    }

    interface IMonitoring {
      on(event: 'initialized', cb: (env: IEnvironment) => void): void;

      on(event: 'cpu', cb: (env: ICpu) => void): void;
      on(event: 'eventloop', cb: (env: IEventloop) => void): void;
      on(event: 'gc', cb: (env: IGc) => void): void;
      on(event: 'loop', cb: (env: ILoop) => void): void;
      on(event: 'memory', cb: (env: IMemory) => void): void;
      on(event: 'profiling', cb: (env: IProfiling) => void): void;

      on(event: 'http', cb: (env: IHttp) => void): void;
      on(event: 'http-outbound', cb: (env: IHttpOutbound) => void): void;

      on(event: 'request', cb: (env: IRequest) => void): void;

      removeListener(event: string | symbol, listener: (...args: any[]) => void): this; // tslint:disable-line:no-any
      removeAllListeners(event?: string | symbol): this;

      enable(type: TMetric): void;
      disable(type: TMetric): void;
      getEnvironment(): IEnvironment;
      raiseLocalEvent<T extends {time: number}>(type: string, data: T): void;
    }

    interface IAppmetricsOptions {
      applicationID?: string;
      mqtt?: 'on' | 'off';
      mqttHost?: string;
      mqttPort?: string;
      profiling?: 'on' | 'off';
    }

    interface IHttpConfig {
      filters?: Array<{pattern: string, to: string}>;
    }

    interface IRequestsConfig {
      excludeModules?: string[];
    }

    interface ITraceConfig {
      includeModules?: string[];
    }

    interface IAdvancedProfilingConfig {
      threshold?: number;
    }

    type TMetric = 'eventloop' | 'profiling' | 'http' | 'http-outbound' | 'mongo' |
      'socketio' | 'mqlight' | 'postgresql' | 'mqtt' | 'mysql' | 'redis' |
      'riak' | 'memcached' | 'oracledb' | 'oracle' | 'strong-oracle' |
      'requests' | 'trace';

    type TMetricConfig = {
      'eventloop': never,
      'profiling': never,
      'http': IHttpConfig,
      'http-outbound': never,
      'mongo': never,
      'socketio': never,
      'mqlight': never,
      'postgresql': never,
      'mqtt': never,
      'mysql': never,
      'redis': never,
      'riak': never,
      'memcached': never,
      'oracledb': never,
      'oracle': never,
      'strong-oracle': never,
      'requests': IRequestsConfig,
      'trace': ITraceConfig,
      'advancedProfiling': IAdvancedProfilingConfig,
    };

    interface IMonitorFunction {
      (): IMonitoring;
      getEnvironment(): IEnvironment;
    }

    interface IAppmetrics {
      configure(options: IAppmetricsOptions): void;
      start(): void;
      stop(): void;
      enable<T extends TMetric>(type: T, config?: TMetricConfig[T]): void;
      disable(type: TMetric): void;
      setConfig<T extends keyof TMetricConfig>(type: T, config?: TMetricConfig[T]): void;
      monitor: IMonitorFunction;
      emit<T extends {time: number}>(type: string, data: T): void;
      writeSnapshot(filename?: string, cb?: (err: any, filename: string) => void): void; // tslint:disable-line:no-any
    }
  }

  const appmetrics: appmetrics.IAppmetrics;
  export = appmetrics;
}
