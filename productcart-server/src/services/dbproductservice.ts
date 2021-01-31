import { initialData, logger } from '../libs/';
import { Product, ProductDocument, ProductModel } from '../models/';

/**
 * Represents DBProduct applicable for
 */
export default class DBProductService {
  /**
   * Insert ProductModel with initial data
   */

  initProduct = async (): Promise<void> => {
    const count: number = await ProductModel.countDocuments();
    if (count <= 0) {
      await this.addProducts(initialData);
    }
  };

  /**
   * Retrieve all products from the MongoDB.
   * @param {request} request from the client app
   * @param {response} response object for the client app
   * @return {response object}
   */

  getProducts = async (): Promise<Product[]> => {
    logger.info('[+] Products to look from productCart Service');
    const dbProducts: ProductDocument[] = await ProductModel.find({});
    const products: Product[] = [];
    dbProducts.forEach(async (dbProduct) => {
      const product = {} as Product;
      product.id = dbProduct.id;
      product.name = dbProduct.name;
      product.price = dbProduct.price;
      product.img = dbProduct.img;
      products.push(product);
    });
    return products;
  };

  /**
   * Delete all products from the MongoDB.
   * @param {request} request from the client app
   * @param {response} response object for the client app
   * @return {response object}
   */

  cleanUpProducts = async (): Promise<void> => {
    logger.info('[+] Delete Products from productCart Service');
    try {
      const query = {};
      const result = await ProductModel.deleteMany(query);
      logger.info(`Deleted ${result.deletedCount} documents`);
    } catch (error) {
      logger.error({
        timeStamp: new Date().toLocaleString(),
        message: `Exception caught ${error}`
      });
    }
  };

  /**
   * Add new products from initial data to the MongoDB.
   * @param {request} request from the client app
   * @param {response} response object for the client app
   * @return {response object}
   */

  addProducts = async (inputProducts: Product[]): Promise<Product[]> => {
    logger.info('[+] addProducts called from productCart Service');
    const outputProducts: Product[] = [];
    inputProducts.forEach(async (data) => {
      logger.info(
        `[+] productCart service added ${data.id}, ${data.name}, ${data.price}, ${data.img}`
      );
      const productModel = new ProductModel();
      productModel.id = data.id;
      productModel.name = data.name;
      productModel.price = data.price;
      productModel.img = data.img;
      try {
        const outputProduct = await productModel.save();
        outputProducts.push(outputProduct);
      } catch (err) {
        logger.error({
          timeStamp: new Date().toLocaleString(),
          message: `[+] addProduct -- error adding product ${err}`
        });
      }
    });
    return outputProducts;
  };

  /**
   * Add new product from input product to the MongoDB.
   * @param {request} request from the client app
   * @param {response} response object for the client app
   * @return {response object}
   */

  addProduct = async (inputProduct: Product): Promise<Product> => {
    logger.info('[+] addProducts called from productCart Service');
    logger.info(
      `[+] productCart service added ${inputProduct.id}, ${inputProduct.name}, ${inputProduct.price}, ${inputProduct.img}`
    );
    const productModel = new ProductModel();
    productModel.id = inputProduct.id;
    productModel.name = inputProduct.name;
    productModel.price = inputProduct.price;
    productModel.img = inputProduct.img;
    try {
      const productDocument: ProductDocument = await productModel.save();
      const outputProduct = {} as Product;
      outputProduct.id = productDocument.id;
      outputProduct.name = productDocument.name;
      outputProduct.price = productDocument.price;
      outputProduct.img = productDocument.img;
      return outputProduct;
    } catch (err) {
      logger.error({
        timeStamp: new Date().toLocaleString(),
        message: `[+] addProduct -- error adding product ${err}`
      });
    }
  };

  /**
   * Get a product from input product to the MongoDB.
   * @param {request} request from the client app
   * @param {response} response object for the client app
   * @return {response object}
   */

  getProduct = async (id: string): Promise<Product[]> => {
    logger.info('[+] getProduct called from productCart Service');
    logger.info(`[+] productCart get ${id}`);
    try {
      const dbProducts: ProductDocument[] = await ProductModel.find({ id });
      const outputProducts: Product[] = [];
      dbProducts.forEach(async (dbProduct) => {
        const product = {} as Product;
        product.id = dbProduct.id;
        product.name = dbProduct.name;
        product.price = dbProduct.price;
        product.img = dbProduct.img;
        outputProducts.push(product);
      });
      return outputProducts;
    } catch (err) {
      logger.error({
        timeStamp: new Date().toLocaleString(),
        message: `[+] addProduct -- error adding product ${err}`
      });
    }
  };

  /**
   * Add new products from initial data to the MongoDB.
   * @param {request} request from the client app
   * @param {response} response object for the client app
   * @return {response object}
   */

  upsertProducts = async (items: Product[]): Promise<Product[]> => {
    const outputProducts: Product[] = [];
    items.forEach(async (data: Product) => {
      logger.info(`[+] productCart service to be updated/inserted. ${data.id}, ${data.price}`);
      const filter = { id: data.id };
      const update = { price: data.price };
      try {
        let doc = await ProductModel.findOne(filter);
        const oldPrice = doc.price;
        doc = await ProductModel.findOneAndUpdate(filter, update, {
          new: true,
          upsert: true // Make this update into an upsert
        });
        doc = await ProductModel.findOne(filter);
        logger.info(`[+] ${data.id} old price was ${oldPrice} and now, new price is ${doc.price} `);
        const outputProduct = {} as Product;
        outputProduct.id = doc.id;
        outputProduct.name = doc.name;
        outputProduct.price = doc.price;
        outputProduct.img = doc.img;
        outputProducts.push(outputProduct);
      } catch (err) {
        logger.error({
          timeStamp: new Date().toLocaleString(),
          message: `[+] addProduct -- error adding product ${err}`
        });
      }
    });
    return outputProducts;
  };

  /**
   * Add new products from initial data to the MongoDB.
   * @param {request} request from the client app
   * @param {response} response object for the client app
   * @return {response object}
   */

  upsertProduct = async (item: Product): Promise<Product> => {
    logger.info(`[+] productCart service to be updated/inserted. ${item.id}, ${item.price}`);
    const filter = { id: item.id };
    const update = { price: item.price, name: item.name, img: item.img };
    try {
      let doc = await ProductModel.findOne(filter);
      const oldPrice = doc.price;
      const oldName = doc.name;
      const oldImg = doc.img;
      doc = await ProductModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
      });
      doc = await ProductModel.findOne(filter);
      logger.info(
        `[+] ${item.id} old price was ${oldPrice}, old name ${oldName}, old img ${oldImg} and now, updated price is ${doc.price}, name ${doc.name} img ${doc.img}`
      );
      const outputProduct = {} as Product;
      outputProduct.id = doc.id;
      outputProduct.name = doc.name;
      outputProduct.price = doc.price;
      outputProduct.img = doc.img;
      return outputProduct;
    } catch (err) {
      logger.error({
        timeStamp: new Date().toLocaleString(),
        message: `[+] upsertProduct -- error adding product ${err}`
      });
    }
  };
}
