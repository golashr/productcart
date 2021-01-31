import { ICheckedOutProduct, IRule } from '../types';
import { Product } from '../models/';
import { RULES } from '../constants';
import { logger, PricingRulesJSON } from '../libs/';

/**
 * Represents Pricing Rules applicable for calculating total price
 */
export default class PricingRules {
  products: Product[];

  /**
   * Represents PricingRules.
   * @constructor
   * @param {list} products list of products from MongoDB
   */
  constructor(products: Product[]) {
    if (!products) {
      logger.error({
        timeStamp: new Date().toLocaleString(),
        message: '[+] getProducts -- error getting products from mongoDB!'
      });
    }
    products.forEach(product => {
      logger.info(
        `[+] ProductCart service has ${product.id}, ${product.name}, ${product.price}, ${product.img}.`
      );
    });
    this.products = products;
    logger.info(`[+] Total number of products in pricingRules ${this.products.length}`);
  }

  /**
   * Item of which price to be calculated
   * @param {list} products of scanned products
   * @return {number} price
   */
  calculateTotal(promotionCode: string, checkedOutProducts: ICheckedOutProduct[]): number {
    logger.info(
      `[+] Total number of checkedOut products in pricingRules ${checkedOutProducts.length}`
    );

    const rule: IRule = PricingRulesJSON.find((tempRule: IRule) => tempRule.code === promotionCode);
    if (rule) {
      switch (rule.value_type) {
        case RULES.PERCENTAGE:
          return this.runPercentageRule(rule, checkedOutProducts);
        case RULES.FIXED_AMOUNT:
          return this.runFixedAmountRule(rule, checkedOutProducts);
        case RULES.FIXED_AMOUNT_DEPENDENT_ID:
          return this.runFixedAmountDependentIdRule(rule, checkedOutProducts);
        default:
          return this.runDefaultRule(checkedOutProducts);
      }
    } else {
      return this.runDefaultRule(checkedOutProducts);
    }
  }

  runPercentageRule(rule: IRule, checkedOutProducts: ICheckedOutProduct[]): number {
    logger.info('runRulePercentage ', rule);
    let calculatedTotal = 0;
    checkedOutProducts.forEach((product: ICheckedOutProduct) => {
      const productPrice = this.getPriceOfProduct(product.id);
      calculatedTotal += productPrice * product.count;
    });
    if (calculatedTotal > rule.conditions.subTotal)
      calculatedTotal = ((100 - rule.value) / 100) * calculatedTotal;
    return +calculatedTotal.toFixed(2); // Weird typescript!! number.toFixed returns 'string'!! :-(
  }

  runFixedAmountRule = (rule: IRule, checkedOutProducts: ICheckedOutProduct[]): number => {
    let calculatedTotal = 0;
    if (rule.conditions.minQuantity !== -1) {
      checkedOutProducts.forEach((product: ICheckedOutProduct) => {
        let productPrice = 0;
        const { count, id } = product;
        if (id === rule.id && count >= rule.conditions.minQuantity) {
          productPrice = rule.value;
        } else productPrice = this.getPriceOfProduct(id);
        calculatedTotal += productPrice * count;
      });
    }
    return +calculatedTotal.toFixed(2); // Weird typescript!! number.toFixed returns 'string'!! :-(
  };

  runFixedAmountDependentIdRule(rule: IRule, checkedOutProducts: ICheckedOutProduct[]): number {
    logger.info('runFixedAmountDependentIdRule ', rule);
    let calculatedTotal = 0;
    let dependentIdCount = 0;
    checkedOutProducts.forEach((product: ICheckedOutProduct) => {
      if (product.id === rule.conditions.dependentId) {
        dependentIdCount = product.count;
      }
    });
    checkedOutProducts.forEach(product => {
      const { count, id } = product;
      if (id === rule.id) {
        if (dependentIdCount >= rule.conditions.minQuantity) {
          calculatedTotal += rule.value * count;
        } else {
          calculatedTotal += this.getPriceOfProduct(id) * count;
        }
      } else {
        calculatedTotal += this.getPriceOfProduct(id) * count;
      }
    });
    return +calculatedTotal.toFixed(2); // Weird typescript!! number.toFixed returns 'string'!! :-(
  }

  /**
   * Calculate the total price of each checkedOut product and sumTotal when no rule is specified
   * @param {ICheckedOutProduct} checkedOut products
   * @return {number} price
   */
  runDefaultRule = (checkedOutProducts: ICheckedOutProduct[]): number => {
    let calculatedTotal = 0;
    checkedOutProducts.forEach(product => {
      calculatedTotal += this.getPriceOfProduct(product.id) * product.count;
    });
    return +calculatedTotal.toFixed(2); // Weird typescript!! number.toFixed returns 'string'!! :-(
  };

  /**
   * Item of which price to be calculated
   * @param {id} id product
   * @return {number} price
   */
  getPriceOfProduct(id: string): number {
    let price = -1;
    this.products.forEach(product => {
      if (product.id === id) {
        price = product.price;
      }
    });
    return price;
  }
}
