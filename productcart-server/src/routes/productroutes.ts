/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, Router } from 'express';
import Ajv from 'ajv';
import { API_ENDPOINTS, STATUS_CODE } from '../constants';
import { logger, successResponse, failureResponse } from '../libs/';
import { ProductService } from '../services';
import { Product } from '../models/';
import { ProductSchema } from '../schema/';

const productRouter = Router();
const ajv = new Ajv();

/**
 * Router GET call with '/products' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
productRouter.get(
  `${API_ENDPOINTS.PRODUCTS_API}`,
  async (request: Request, response: Response): Promise<any> => {
    logger.info('[+] In the products API GET all products');
    try {
      const productService = new ProductService();
      const products = await productService.getAllProducts();
      return successResponse(
        response,
        STATUS_CODE.CODE_200.statusCode,
        STATUS_CODE.CODE_200.message,
        products
      );
    } catch (error) {
      return failureResponse(response, STATUS_CODE.CODE_500.statusCode, error);
    }
  }
);

/**
 * Router POST call with '/products' endpoint to addProduct
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
productRouter.post(
  `${API_ENDPOINTS.PRODUCTS_API}`,
  async (request: Request, response: Response): Promise<any> => {
    logger.info('[+] In the products API POST add new product');
    const product: Product = request.body;
    const result = ajv.validate(ProductSchema, product);
    logger.info(`[+] Schema validation result is ${result}`);
    if (!result) {
      return failureResponse(
        response,
        STATUS_CODE.CODE_400.statusCode,
        STATUS_CODE.CODE_400.errorCode
      );
    }
    try {
      const productService = new ProductService();
      const outputProduct: Product = await productService.addProduct(product);
      return successResponse(
        response,
        STATUS_CODE.CODE_201.statusCode,
        STATUS_CODE.CODE_201.message,
        outputProduct
      );
    } catch (error) {
      return failureResponse(response, STATUS_CODE.CODE_500.statusCode, error);
    }
  }
);

/**
 * Router GET call with '/product' endpoint to get Product by ID
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
productRouter.get(
  `${API_ENDPOINTS.PRODUCT_API}`,
  async (request: Request, response: Response): Promise<any> => {
    logger.info(`[+] In the products API POST get product by id ${request.params.id}`);
    if (request.params && request.params.id && typeof request.params.id === 'string') {
      const { id } = request.params;
      try {
        const productService = new ProductService();
        const products: Product[] = await productService.getProduct(id);
        return successResponse(
          response,
          STATUS_CODE.CODE_200.statusCode,
          STATUS_CODE.CODE_200.message,
          products
        );
      } catch (error) {
        return failureResponse(response, STATUS_CODE.CODE_500.statusCode, error);
      }
    }
  }
);

/**
 * Router PUT call with '/product' endpoint to update Product by ID
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
productRouter.put(
  `${API_ENDPOINTS.PRODUCT_API}`,
  async (request: Request, response: Response): Promise<any> => {
    logger.info(`[+] In the products API POST get product by id ${request.params.id}`);
    if (request.params && request.params.id && typeof request.params.id === 'string') {
      const product: Product = request.body;
      const result = ajv.validate(ProductSchema, product);
      logger.info(`[+] Schema validation result is ${result}`);
      if (!result) {
        return failureResponse(
          response,
          STATUS_CODE.CODE_400.statusCode,
          STATUS_CODE.CODE_400.errorCode
        );
      }
      try {
        const productService = new ProductService();
        const outputProduct: Product = await productService.updateProduct(product);
        return successResponse(
          response,
          STATUS_CODE.CODE_200.statusCode,
          STATUS_CODE.CODE_200.message,
          outputProduct
        );
      } catch (error) {
        return failureResponse(response, STATUS_CODE.CODE_500.statusCode, error);
      }
    }
  }
);

export default productRouter;
