export interface IProduct {
  id: string;
  name: string;
  price: string;
  img: string;
}

export interface IProductArray {
  products: IProduct[];
}

export interface IProductProp {
  product: IProduct;
}

export interface IState {
  productCartState: {
    products: IProduct[];
  };
  selectedProductsState: {
    shoppingCart: ICheckedOutProduct[];
  };
  checkOutPriceState: {
    checkOutPrice: number;
  };
}

export interface IProductState {
  products: IProduct[];
}

export interface IShoppingCartState {
  shoppingCart: ICheckedOutProduct[];
}

export interface ICheckOutPriceState {
  checkOutPrice: number;
}

export interface IProps {
  history: {
    push: (route: string) => void;
  };
}

export interface ICheckedOutProduct {
  id: string;
  price: string;
  count: number;
}

export type ICheckedOutCart = {
  checkedOutProducts: ICheckedOutProduct[];
  promotionCode: string;
};

export type IListOfProducts = {
  payload: ICheckedOutCart;
};
