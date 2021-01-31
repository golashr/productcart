import { logger } from '../libs/';
import PricingRules from './pricingrules';
import { ICheckedOutCart } from '../types';
import { Product } from '../models/';
import DBProductService from './dbproductservice';

/**
 * Represents ProductService process and uses pricingRules.
 */
export default class ProductService {
  dbProductService = new DBProductService();
  /**
   * Retrieve the total price at checkout token from the given service.
   * @param {products} products of the remote service
   * @return {total of the checkedOut cart}
   */

  checkout = async (checkedOutCart: ICheckedOutCart): Promise<number> => {
    logger.info(
      `[+] Total number of products checkedOut ${checkedOutCart.checkedOutProducts.length}`
    );
    try {
      const allProducts = await this.dbProductService.getProducts();
      const pricingRules = new PricingRules(allProducts);
      return pricingRules.calculateTotal(
        checkedOutCart.promotionCode,
        checkedOutCart.checkedOutProducts
      );
    } catch (err) {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
    }
  };

  /**
   * Retrieve the list of all Products from the given DB.
   * @param {url} URL of the remote service
   * @return {products}
   */

  getAllProducts = async (): Promise<Product[]> => {
    logger.info('[+] Retrieve list of all products');
    try {
      const productsDB = await this.dbProductService.getProducts();
      const products: Product[] = [];
      productsDB.forEach(async (data: Product) => {
        const product = data as Product;
        product.id = data.id || '';
        product.name = data.name || '';
        product.price = data.price || 0;
        product.img = data.img || '';
        products.push(product);
      });
      return products;
    } catch (err) {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
    }
  };

  /**
   * Insert/Update the Product(s) from the given DB.
   * @param {url} URL of the remote service
   * @return {response data}
   */

  addProducts = async (products: Product[]): Promise<Product[]> => {
    logger.info('[+] Add list of Products');
    try {
      // const result = ajv.validate(updateProductSchema, products);
      // logger.info(`[+] Schema validation result is ${result}`);
      const result = true;
      if (result) {
        return await this.dbProductService.addProducts(products);
      }
      // Throw error to catch at the called method to send proper error response.
      throw Error('Schema validation failed!');
    } catch (err) {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
    }
  };

  /**
   * Insert/Update the Product(s) from the given DB.
   * @param {url} URL of the remote service
   * @return {response data}
   */

  addProduct = async (product: Product): Promise<Product> => {
    logger.info('[+] add Product');
    try {
      // const result = ajv.validate(updateProductSchema, products);
      // logger.info(`[+] Schema validation result is ${result}`);
      const result = true;
      if (result) {
        return await this.dbProductService.addProduct(product);
      }
      // Throw error to catch at the called method to send proper error response.
      throw Error('Schema validation failed!');
    } catch (err) {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
    }
  };

  /**
   * Insert/Update the Product(s) from the given DB.
   * @param {url} URL of the remote service
   * @return {response data}
   */

  getProduct = async (id: string): Promise<Product[]> => {
    logger.info('[+] get Product');
    try {
      // const result = ajv.validate(updateProductSchema, products);
      // logger.info(`[+] Schema validation result is ${result}`);
      const result = true;
      if (result) {
        return await this.dbProductService.getProduct(id);
      }
      // Throw error to catch at the called method to send proper error response.
      throw Error('Schema validation failed!');
    } catch (err) {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
    }
  };

  /**
   * Insert/Update the Product(s) from the given DB.
   * @param {url} URL of the remote service
   * @return {response data}
   */

  updateProducts = async (products: Product[]): Promise<Product[]> => {
    logger.info('[+] Retrieve list of Products');
    try {
      // const result = ajv.validate(updateProductSchema, products);
      // logger.info(`[+] Schema validation result is ${result}`);
      const result = true;
      if (result) {
        return await this.dbProductService.upsertProducts(products);
      }
      // Throw error to catch at the called method to send proper error response.
      throw Error('Schema validation failed!');
    } catch (err) {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
    }
  };

  /**
   * Insert/Update the Product(s) from the given DB.
   * @param {url} URL of the remote service
   * @return {response data}
   */

  updateProduct = async (product: Product): Promise<Product> => {
    logger.info('[+] Update the given product');
    try {
      // const result = ajv.validate(updateProductSchema, products);
      // logger.info(`[+] Schema validation result is ${result}`);
      const result = true;
      if (result) {
        return await this.dbProductService.upsertProduct(product);
      }
      // Throw error to catch at the called method to send proper error response.
      throw Error('Schema validation failed!');
    } catch (err) {
      // Throw error to catch at the called method to send proper error response.
      throw Error(err);
    }
  };
}
