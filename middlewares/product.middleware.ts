import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { searchProducts, getProductData } from "controllers/product.controller";

const searchProductsSchema = yup.object().shape({
  q: yup.string().required(),
  offset: yup.number().required(),
  limit: yup.number().required(),
});

const getProductDataSchema = yup.object().shape({
  id: yup.number().required(),
});

const searchProductsMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await searchProductsSchema.validate(req.query);
  } catch (e) {
    res.status(400).json({ field: "query", message: e });
  }

  const { q: query } = req.query;
  const offset = parseInt(req.query.offset as string);
  const queryLimit = parseInt(req.query.limit as string);

  const limit = queryLimit <= 100 ? queryLimit : 100;

  const options = { query, offset, limit };

  await searchProducts(req, res, options);
};

const getProductDataMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await getProductDataSchema.validate(req.query);
  } catch (e) {
    res.status(400).json({ field: "query", message: e });
  }

  await getProductData(req, res);
};

export { searchProductsMiddleware, getProductDataMiddleware };
