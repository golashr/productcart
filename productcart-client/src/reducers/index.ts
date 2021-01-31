import {
  PRODUCTCART_PRODUCTS_REQUEST_SUCCESS,
  PRODUCTCART_PRODUCTS_REQUEST_FAILED,
  PRODUCTCART_CHECKOUT_REQUEST_SUCCESS,
  PRODUCTCART_CHECKOUT_REQUEST_FAILED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../constants';
import {
  IProduct,
  IProductState,
  IShoppingCartState,
  ICheckOutPriceState,
  ICheckedOutProduct,
} from '../interface';

const initialProductState: IProductState = {
  products: [],
};

export const productCartState = (state = initialProductState, action: any) => {
  switch (action.type) {
    case PRODUCTCART_PRODUCTS_REQUEST_SUCCESS: {
      return {
        ...state,
        products: action.data,
      };
    }
    case PRODUCTCART_PRODUCTS_REQUEST_FAILED: {
      return {
        ...state,
        products: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

const initialShoppingCartState: IShoppingCartState = {
  shoppingCart: [],
};

export const selectedProductsState = (
  state = initialShoppingCartState,
  action: { type: string; product: IProduct },
) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let shoppingCart: ICheckedOutProduct[] = state.shoppingCart;
      let selectedProduct = shoppingCart.find(cart => cart.id === action.product.id);
      if (selectedProduct) {
        selectedProduct.count += 1;
      } else {
        shoppingCart.push({ id: action.product.id, price: action.product.price, count: 1 });
      }
      return {
        ...state,
        shoppingCart: shoppingCart,
      };
    }
    case REMOVE_FROM_CART: {
      let shoppingCart: ICheckedOutProduct[] = state.shoppingCart;
      let selectedProduct = shoppingCart.find(cart => cart.id === action.product.id);
      if (selectedProduct) {
        selectedProduct.count = selectedProduct.count <= 0 ? 0 : selectedProduct.count - 1;
        shoppingCart = shoppingCart.filter((product: ICheckedOutProduct) => product.count !== 0);
      } else {
        shoppingCart.push({ id: action.product.id, price: action.product.price, count: 0 });
      }
      return {
        ...state,
        shoppingCart: shoppingCart,
      };
    }
    default:
      return state;
  }
};

const initialCheckOutState: ICheckOutPriceState = {
  checkOutPrice: 0,
};

export const checkOutPriceState = (state = initialCheckOutState, action: any) => {
  switch (action.type) {
    case PRODUCTCART_CHECKOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        checkOutPrice: action.checkOutPrice,
      };
    }
    case PRODUCTCART_CHECKOUT_REQUEST_FAILED: {
      return {
        ...state,
        checkOutPrice: action.checkOutPrice,
      };
    }
    default: {
      return state;
    }
  }
};
