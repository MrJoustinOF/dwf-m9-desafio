import type { NextApiRequest, NextApiResponse } from "next";
import { Order } from "models/Order";
import { Product } from "models/Product";
import { createPreference, getMerchantOrder } from "lib/mercadopago";

const createOrder = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token
) => {
  const { id: userId } = token;
  const { productId } = req.query;
  const { quantity } = req.body;

  const { id: orderId } = await Order.createEmpty();
  const product: any = await Product.findById(productId as string);

  if (!product) {
    res.json({ msg: "product not found" });
  }

  const { stock } = product;

  if (stock === 0) {
    res.json({ msg: "stock not available" });
  }

  const { init_point: url } = await createPreference({
    product,
    quantity,
    orderId,
  });

  const data = {
    productId,
    userId,
    status: "pending",
    url,
    aditional_info: {
      ...req.body,
    },
  };

  await Order.updateById(orderId, data);

  res.json({ url, orderId, msg: "orderId is from db" });
};

const getOrderData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId } = req.query;

  const order = (await Order.findById(orderId as string)).data();

  res.status(404).json(!order ? { msg: "not found" } : order);
};

const ipnMercadoPago = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, topic } = req.query;

  if (topic === "merchant_order") {
    const { body } = await getMerchantOrder(id);

    const { order_status: status, external_reference: refId } = body;

    if (status !== "paid") {
      await Order.updateById(refId, { status });
    } else {
      await Order.updateById(refId, { status, url: null });
    }
  }

  res.send("ok");
};

export { createOrder, getOrderData, ipnMercadoPago };
