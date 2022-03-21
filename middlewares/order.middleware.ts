import type { NextApiRequest } from "next";
import * as yup from "yup";
import { createOrder, getOrderData } from "controllers/order.controller";
import { verifyBearer } from "lib/bearer-token";

const createOrderSchema = yup.object().shape({
  productId: yup.number().required(),
});

const getOrderDataSchema = yup.object().shape({
  orderId: yup.string().required(),
});

const createOrderMiddleware = async (req: NextApiRequest) => {
  const decodedToken: any = verifyBearer(req);

  if (decodedToken.status && decodedToken.response) {
    const { status, response } = decodedToken;

    return { status, response };
  }

  try {
    await createOrderSchema.validate(req.query);

    const res = await createOrder(req, decodedToken);

    return res;
  } catch (e) {
    return { status: 400, response: { field: "query", message: e } };
  }
};

const getOrderDataMiddleware = async (query) => {
  try {
    await getOrderDataSchema.validate(query);

    const { orderId } = query;

    const res = await getOrderData(orderId);

    return res;
  } catch (e) {
    return { status: 400, response: { field: "query", message: e } };
  }
};

export { createOrderMiddleware, getOrderDataMiddleware };
