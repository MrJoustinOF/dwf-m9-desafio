import * as yup from "yup";
import { searchProducts, getProductData } from "controllers/product.controller";
import { getLimitAndOffset } from "lib/getLimitAndOffset";

const searchProductsSchema = yup.object().shape({
  q: yup.string().required(),
  offset: yup.number().required(),
  limit: yup.number().required(),
});

const getProductDataSchema = yup.object().shape({
  id: yup.number().required(),
});

const searchProductsMiddleware = async (query) => {
  try {
    await searchProductsSchema.validate(query);

    const options = getLimitAndOffset(query);

    const res = await searchProducts(options);

    return res;
  } catch (e) {
    return { status: 400, response: { field: "query", message: e } };
  }
};

const getProductDataMiddleware = async (query) => {
  try {
    await getProductDataSchema.validate(query);

    const { id } = query;
    const res = await getProductData(id);

    return res;
  } catch (e) {
    return { status: 400, response: { field: "query", message: e } };
  }
};

export { searchProductsMiddleware, getProductDataMiddleware };
