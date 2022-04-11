import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { corsMiddleware, validateSchema } from "utils/middlewares";
import { searchProductsSchema } from "utils/schemas";
import { getLimitAndOffset } from "lib/getLimitAndOffset";
import { searchProducts } from "controllers/product.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const options = getLimitAndOffset(query);

  const { hits, pagination } = await searchProducts(options);

  res.json({ hits, pagination });
};

const get = validateSchema(handler, searchProductsSchema);

export default corsMiddleware(
  methods({
    get,
  })
);
