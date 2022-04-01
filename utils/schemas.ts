import * as yup from "yup";

const getCodeSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
  }),
});

const getTokenSchema = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().email().required(),
    code: yup.number().required(),
  }),
});

const updateMyDataSchema = yup.object().shape({
  body: yup.object().shape({
    name: yup.string(),
    lastname: yup.string(),
  }),
});

const updateMyAddressSchema = yup.object().shape({
  body: yup.object().shape({
    address: yup.object(),
  }),
});

const searchProductsSchema = yup.object().shape({
  query: yup.object().shape({
    q: yup.string().required(),
    offset: yup.number().required(),
    limit: yup.number().required(),
  }),
});

const getProductDataSchema = yup.object().shape({
  query: yup.object().shape({
    id: yup.number().required(),
  }),
});

const createOrderSchema = yup.object().shape({
  query: yup.object().shape({
    productId: yup.number().required(),
  }),
});

const getOrderDataSchema = yup.object().shape({
  query: yup.object().shape({
    orderId: yup.string().required(),
  }),
});

export {
  getCodeSchema,
  getTokenSchema,
  updateMyDataSchema,
  updateMyAddressSchema,
  searchProductsSchema,
  getProductDataSchema,
  createOrderSchema,
  getOrderDataSchema,
};
