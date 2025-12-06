import bunyan, { LoggerOptions } from 'bunyan';
import bformat from 'bunyan-format';
const formatOut = bformat({
  outputMode: 'short',
});

interface LoggerConfig extends LoggerOptions {
  name: string;
  level: bunyan.LogLevel;
  streams: Array<{
    type?: string;
    path?: string;
    period?: string;
    count?: number;
    stream?: any;
  }>;
}

export class Logger {
  logger: bunyan;

  /**
   * Outputs application info to stdout at the class level
   * @param  {string} name
   * @param  {LoggerConfig} config={}
   */
  constructor(name: string, config: LoggerConfig = {} as LoggerConfig) {
    this.logger = bunyan.createLogger({
      ...Logger.DEFAULTS,
      ...config,
      name,
    });
  }

  info(str: any): void {
    this.logger.info(str);
  }

  debug(str: any): void {
    this.logger.debug(str);
  }

  error(str: any): void {
    this.logger.error(str);
  }

  warn(str: any): void {
    this.logger.warn(str);
  }

  static get DEFAULTS(): LoggerConfig {
    return {
      name: 'logger',
      level:
        process.env.NODE_ENV === 'test'
          ? 100
          : process.env.NODE_ENV === 'debug'
          ? 'debug'
          : 'info',

      streams: [
        {
          type: 'file',
          path: `/tmp/logger.log`,
          period: '1d',
          count: 30,
        },
        {
          stream: formatOut,
        },
      ],
    };
  }
}