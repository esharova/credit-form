import { createLogErrorDataModel } from '@cian/api-models/monolith-python/ajax/log-error';
import { IHttpApi } from '@cian/http-api/shared/http';
import { BrowserLogger } from '@cian/logger/lib/browser/browser_logger';
import { ConsoleWriter } from '@cian/logger/lib/shared/console_writer';
import { IWriter } from '@cian/logger/lib/shared/types';

export interface IBrowserErrorWriterProps {
  httpApi: IHttpApi;
}

export class BrowserErrorWriter extends ConsoleWriter implements IWriter {
  private client: IHttpApi;

  public constructor(props: IBrowserErrorWriterProps) {
    super();

    this.client = props.httpApi;
  }

  public write(error: string) {
    super.write(error);

    this.client.fetch(createLogErrorDataModel({
      parameters: {
        error,
      },
    }));
  }
}

export interface IReactLoggerConfig {
  environment: string;
  httpApi: IHttpApi;
  projectName: string;
  release: string;
}

export function createReactLogger({ environment, httpApi, projectName, release }: IReactLoggerConfig) {
  return new BrowserLogger(
    new ConsoleWriter(),
    new BrowserErrorWriter({ httpApi }),
    projectName,
    environment,
    release,
  );
}
