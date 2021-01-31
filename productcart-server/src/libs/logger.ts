import winston from 'winston';
import { config } from '../constants';

const options: winston.LoggerOptions = {
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'info'
    }),
    new winston.transports.File({
      level: 'error',
      filename: `./logs/${config.packageName}_error.log`
    }),
    new winston.transports.File({
      level: 'info',
      filename: `./logs/${config.packageName}_combined.log`
    })
  ]
};
const logger = winston.createLogger(options);

export default logger;
