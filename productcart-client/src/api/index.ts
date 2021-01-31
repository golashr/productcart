import axios from 'axios';
import { API_ENDPOINTS, ROUTES } from '../constants';
import { IListOfProducts } from '../interface';

export const productCartProductsAPI = async () => {
  try {
    const productsAPI = API_ENDPOINTS.BASE_URL + ROUTES.PRODUCTS;
    const res = await axios({
      method: 'get',
      url: productsAPI,
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
      },
    });
    const { data } = await res;
    return data;
  } catch (error) {
    console.log('ERROR from productCartProductsAPI', error);
  }
};

export const productCartCheckoutAPI = async (listOfProducts: IListOfProducts) => {
  try {
    const checkoutApi = API_ENDPOINTS.BASE_URL + ROUTES.CHECKOUT;
    const res = await axios({
      method: 'post',
      url: checkoutApi,
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
      },
      data: listOfProducts.payload,
    });
    const { data } = await res;
    return data.data;
  } catch (error) {
    console.log('ERROR from productCartCheckoutAPI', error);
    return 0;
  }
};
