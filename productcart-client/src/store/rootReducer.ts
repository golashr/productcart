import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { productCartState, selectedProductsState, checkOutPriceState } from '../reducers';

export const rootReducer = (history: any) => {
  return combineReducers({
    productCartState,
    selectedProductsState,
    checkOutPriceState,
    router: connectRouter(history),
  });
};
