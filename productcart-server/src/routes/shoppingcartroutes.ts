import { Request, Response, Router } from 'express';
import Ajv from 'ajv';
import { API_ENDPOINTS, STATUS_CODE } from '../constants';
import { logger, successResponse, failureResponse } from '../libs/';
import { ProductService } from '../services';
import { ICheckedOutCart } from '../types';
import { checkedOutCartSchema } from '../schema';

const shoppingCartRouter = Router();
const ajv = new Ajv();

/**
 * Router POST call with '/api/v1/checkout' endpoint.
 * @param {request} request from the client app with ICheckedOutCart 
 * object in body
 * @param {response} response object for the client app
 * @return {response object}
 */
shoppingCartRouter.post(
  `${API_ENDPOINTS.CHECKOUT_API}`,
  async (request: Request, response: Response) => {
    logger.info('[+] In the checkout cost API');
    const checkedOutCart: ICheckedOutCart = request.body;
    const result = ajv.validate(checkedOutCartSchema, checkedOutCart);
    logger.info(`[+] Schema validation result is ${result}`);
    if (result) {
      const { checkedOutProducts, promotionCode } = checkedOutCart;
      logger.info(
        `[+] promotionCode ${promotionCode}, number of checkout products ${checkedOutProducts.length}`
      );
      try {
        const productService = new ProductService();
        const calculatedCost = await productService.checkout(checkedOutCart);
        logger.info(`[+] calculatedCost ${calculatedCost} for the cart.`);
        return successResponse(
          response,
          STATUS_CODE.CODE_200.statusCode,
          STATUS_CODE.CODE_200.message,
          calculatedCost
        );
      } catch (error) {
        return failureResponse(response, STATUS_CODE.CODE_500.statusCode, error);
      }
    } else {
      logger.error({
        timeStamp: new Date().toLocaleString(),
        message: '[+] Schema validation failed!'
      });
      return failureResponse(
        response,
        STATUS_CODE.CODE_400.statusCode,
        STATUS_CODE.CODE_400.errorCode
      );
    }
  }
);

export default shoppingCartRouter;
