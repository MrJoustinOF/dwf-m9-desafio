import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { validateSchema } from "utils/middlewares";
import { getOrderDataSchema } from "utils/schemas";
import { getOrderData } from "controllers/order.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId } = req.query;

  const data = await getOrderData(orderId as string);

  res.json(data)
};

const get = validateSchema(handler, getOrderDataSchema);

export default methods({
  get,
});
