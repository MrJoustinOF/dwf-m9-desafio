import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware, validateSchema } from "utils/middlewares";
import { createOrderSchema } from "utils/schemas";
import { createOrder } from "controllers/order.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse, token) => {
  const { id: userId } = token;
  const { productId } = req.query;
  const { body } = req;

  const data = await createOrder(userId, productId as string, { ...body });

  res.json(data);
};

const post = validateSchema(authMiddleware(handler), createOrderSchema);

export default methods({
  post,
});
