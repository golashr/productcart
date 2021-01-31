/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response } from 'express';
import { logger } from '../libs/';

export const successResponse = (
  response: Response,
  statusCode: number,
  message: string,
  data?: object | null | number
) => {
  logger.info({
    timeStamp: new Date().toLocaleString(),
    message: `API response sent ${statusCode}`
  });
  if (data === null || data === undefined)
    response.status(statusCode).send({ success: true, timestamp: new Date(), message });
  else {
    response.status(statusCode).send({
      success: true,
      timestamp: new Date(),
      message,
      data
    });
  }
};

export const failureResponse = (
  response: Response,
  statusCode: number,
  errorMessage: string,
  data?: object | null | number
) => {
  const status = statusCode || 500;
  const message = errorMessage || 'The product cart service is experiencing exceptions!';
  logger.error({
    timeStamp: new Date().toLocaleString(),
    message: `${statusCode} ${errorMessage}`
  });
  if (data === null || data === undefined)
    response.status(statusCode).send({ success: true, timestamp: new Date(), message });
  else {
    response.status(status).send({
      success: false,
      timestamp: new Date(),
      errors: [message],
      data
    });
  }
};
