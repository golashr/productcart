import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PRODUCTCART_PRODUCTS_REQUEST, PRODUCTCART_CHECKOUT_REQUEST } from '../constants';
import { productCartProductsAPI, productCartCheckoutAPI } from '../api';
import {
  fetchRemoteProductsRequestSuccess,
  fetchRemoteProductsRequestFailed,
  checkoutRequestSuccess,
  checkoutRequestFailed,
} from '../actions';

export function* startRootSaga() {
  yield all([watchProductCartProductsActions()]);
}

export function* watchProductCartProductsActions() {
  yield takeLatest(PRODUCTCART_PRODUCTS_REQUEST, productCartProductsRequest);
  yield takeLatest(PRODUCTCART_CHECKOUT_REQUEST, productCartCheckoutRequest);
}

export function* productCartProductsRequest() {
  try {
    let response = yield call(productCartProductsAPI);
    if (response) yield put(fetchRemoteProductsRequestSuccess(response));
    else yield put(fetchRemoteProductsRequestFailed([]));
  } catch (error) {
    console.log('ERROR from productCartProductsRequest', error);
    yield put(fetchRemoteProductsRequestFailed(error));
  }
}

export function* productCartCheckoutRequest(listOfProducts: any) {
  try {
    let response = yield call(productCartCheckoutAPI, listOfProducts);
    if (response) yield put(checkoutRequestSuccess(response));
    else yield put(checkoutRequestFailed(0));
  } catch (error) {
    console.log('ERROR from productCartProductsRequest', error);
    yield put(checkoutRequestFailed(error));
  }
}
