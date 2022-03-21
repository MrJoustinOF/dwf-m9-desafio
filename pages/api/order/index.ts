import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { createOrderMiddleware } from "middlewares/order.middleware";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, response } = await createOrderMiddleware(req);

  res.status(status).json(response);
};

export default methods({
  post,
});
