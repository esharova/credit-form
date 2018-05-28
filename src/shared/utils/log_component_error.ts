import { ILogger } from '@cian/logger/lib/shared/types';

export interface ILogComponentErrorOptions {
  logger: ILogger;
  error: Error;
  errorInfo: React.ErrorInfo;
}

export function logComponentError({ error, errorInfo, logger }: ILogComponentErrorOptions) {
  logger.error(error, { message: error.message, reactInfo: errorInfo.componentStack });
}
