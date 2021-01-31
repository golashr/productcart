export interface IRule {
  code: string;
  description: string;
  id: string | '';
  value: number;
  value_type: string;
  conditions: {
    subTotal: number | -1;
    minQuantity: number | -1;
    dependentId: string;
  };
}
