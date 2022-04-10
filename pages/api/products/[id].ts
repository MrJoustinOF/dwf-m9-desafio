import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { corsMiddleware, validateSchema } from "utils/middlewares";
import { getProductDataSchema } from "utils/schemas";
import { getProductData } from "controllers/product.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const data = await getProductData(id as string);

  res.json(data);
};

const get = corsMiddleware(validateSchema(handler, getProductDataSchema));

export default methods({
  get,
});
