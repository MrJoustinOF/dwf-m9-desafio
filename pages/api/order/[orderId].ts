import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getOrderDataMiddleware } from "middlewares/order.middleware";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const { status, response } = await getOrderDataMiddleware(query);

  res.status(status).json(response);
};

export default methods({
  get,
});
