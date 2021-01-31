export const PricingRulesJSON = [
  {
    code: 'RRD4D32',
    description: '10% discount for orders above $1000 (pre-discount)',
    id: '',
    value: 10.0,
    value_type: 'percentage',
    conditions: {
      subTotal: 999,
      minQuantity: -1,
      dependentId: 'null'
    }
  },
  {
    code: '44F4T11',
    description: '15% discount for orders above $1500 (pre-discount)',
    id: '',
    value: 15.0,
    value_type: 'percentage',
    conditions: {
      subTotal: 1499,
      minQuantity: -1,
      dependentId: 'null'
    }
  },
  {
    code: 'FF9543D1',
    description:
      'Reduces the docgen price to $8.99 a unit when at least 10 documents are purchased',
    id: 'docgen',
    value: 8.99,
    value_type: 'fixed_amount',
    conditions: {
      subTotal: -1,
      minQuantity: 10,
      dependentId: 'null'
    }
  },
  {
    code: 'YYGWKJD',
    description: 'Reduces the form price to $89.99 a unit when at least 1 wf is purchased',
    id: 'form',
    value: 89.99,
    value_type: 'fixed_amount_dependent_id',
    conditions: {
      subTotal: -1,
      minQuantity: 1,
      dependentId: 'wf'
    }
  }
];
