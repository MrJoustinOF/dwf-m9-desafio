import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getProductDataMiddleware } from "middlewares/product.middleware";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const { status, response } = await getProductDataMiddleware(query);

  res.status(status).json(response);
};

export default methods({
  get,
});
