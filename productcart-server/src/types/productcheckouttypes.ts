export type ICheckedOutProduct = {
  id: string;
  count: number;
};

export type ICheckedOutCart = {
  checkedOutProducts: ICheckedOutProduct[];
  promotionCode: string;
};
