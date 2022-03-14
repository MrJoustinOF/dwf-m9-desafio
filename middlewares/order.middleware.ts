import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { createOrder, getOrderData } from "controllers/order.controller";
import { verifyBearer } from "lib/bearer-token";

const createOrderSchema = yup.object().shape({
  productId: yup.number().required(),
});

const getOrderDataSchema = yup.object().shape({
  orderId: yup.string().required(),
});

const createOrderMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const decodedToken = verifyBearer(req, res);

  try {
    await createOrderSchema.validate(req.query);
  } catch (e) {
    res.status(400).json({ field: "query", message: e });
  }

  await createOrder(req, res, decodedToken);
};

const getOrderDataMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await getOrderDataSchema.validate(req.query);
  } catch (e) {
    res.status(400).json({ field: "query", message: e });
  }

  await getOrderData(req, res);
};

export { createOrderMiddleware, getOrderDataMiddleware };
