export const API_ENDPOINTS = {
  ROOT_API: '/',
  PING_API: '/ping',
  PRODUCTS_API: '/api/v1/products',
  PRODUCT_API: '/api/v1/products/:id',
  CHECKOUT_API: '/api/v1/checkout'
};

export const STATUS_CODE = {
  CODE_200: { statusCode: 200, message: 'Success' },
  CODE_201: { statusCode: 201, message: 'Product successfully created' },
  CODE_204: { statusCode: 204, message: 'Product successfully updated' },
  CODE_400: { statusCode: 400, errorCode: 'Bad Request' },
  CODE_403: { statusCode: 403, errorCode: 'Request Forbidden' },
  CODE_500: { statusCode: 500, errorCode: 'Internal Server Error' },
  CODE_503: { statusCode: 503, errorCode: 'Service Unavailable' }
};

export const config = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV
    // eslint-disable-next-line no-inline-comments
  },
  mongodb: {
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || '27017',
    dbName: process.env.MONGO_DB || 'productcart'
  },
  packageName: 'productcart'
};

export const RULES = {
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  FIXED_AMOUNT_DEPENDENT_ID: 'fixed_amount_dependent_id'
};
