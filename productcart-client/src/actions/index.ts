import {
  PRODUCTCART_PRODUCTS_REQUEST,
  PRODUCTCART_PRODUCTS_REQUEST_SUCCESS,
  PRODUCTCART_PRODUCTS_REQUEST_FAILED,
  PRODUCTCART_CHECKOUT_REQUEST,
  PRODUCTCART_CHECKOUT_REQUEST_SUCCESS,
  PRODUCTCART_CHECKOUT_REQUEST_FAILED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../constants';
import { IProduct, ICheckedOutCart } from '../interface';

export const fetchRemoteProductsRequest = () => {
  return {
    type: PRODUCTCART_PRODUCTS_REQUEST,
  };
};

export const fetchRemoteProductsRequestSuccess = (payload: any) => {
  return {
    type: PRODUCTCART_PRODUCTS_REQUEST_SUCCESS,
    data: payload.data,
  };
};

export const fetchRemoteProductsRequestFailed = (payload: any) => {
  return {
    type: PRODUCTCART_PRODUCTS_REQUEST_FAILED,
    payload,
  };
};

export const checkoutRequest = (payload: ICheckedOutCart) => {
  return {
    type: PRODUCTCART_CHECKOUT_REQUEST,
    payload,
  };
};

export const checkoutRequestSuccess = (checkOutPrice: number) => {
  return {
    type: PRODUCTCART_CHECKOUT_REQUEST_SUCCESS,
    checkOutPrice,
  };
};

export const checkoutRequestFailed = (checkOutPrice: number) => {
  return {
    type: PRODUCTCART_CHECKOUT_REQUEST_FAILED,
    checkOutPrice,
  };
};

export const addToCart = (product: IProduct) => {
  return {
    product,
    type: ADD_TO_CART,
  };
};

export const removeFromCart = (product: IProduct) => {
  return {
    product,
    type: REMOVE_FROM_CART,
  };
};
