import { Request, Response, Router } from 'express';
import { API_ENDPOINTS, STATUS_CODE } from '../constants';
import { logger, successResponse } from '../libs/';

const rootRouter = Router();

/**
 * Router GET call with '/' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
rootRouter.get(`${API_ENDPOINTS.ROOT_API}`, (request: Request, response: Response) => {
  logger.info('[+] In the root');
  return successResponse(
    response,
    STATUS_CODE.CODE_200.statusCode,
    '<h1>Hello from Productcart Service!</h1>',
    null
  );
});

/**
 * Router GET call with '/ping' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
rootRouter.get(`${API_ENDPOINTS.PING_API}`, (request: Request, response: Response) => {
  logger.info('[+] In the ping');
  return successResponse(
    response,
    STATUS_CODE.CODE_200.statusCode,
    '<h1>Pong from Productcart Service!</h1>',
    null
  );
});

export default rootRouter;
