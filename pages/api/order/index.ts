import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware, validateSchema } from "utils/middlewares";
import { createOrderSchema } from "utils/schemas";
import { createOrder } from "controllers/order.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse, token) => {
  const { id: userId } = token;
  const { productId } = req.query;
  const { body } = req;

  const { error, url, orderId, msg } = await createOrder(
    userId,
    productId as string,
    {
      ...body,
    }
  );

  if (error) {
    res.status(error).json({ msg });
  }

  res.json({ url, orderId, msg });
};

const post = validateSchema(authMiddleware(handler), createOrderSchema);

export default methods({
  post,
});
