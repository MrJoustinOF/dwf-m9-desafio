import { Order } from "models/Order";
import { Product } from "models/Product";
import { createPreference, getMerchantOrder } from "lib/mercadopago";

const createOrder = async (req, token) => {
  const { id: userId } = token;
  const { query, body } = req;
  const { productId } = query;
  const { quantity: bodyQuantity } = body;

  const { id: orderId } = await Order.createEmpty();
  const product: any = await Product.findById(productId as string);

  if (!product) {
    return { status: 404, response: { msg: "product not found" } };
  }

  const { stock } = product;
  const quantity = bodyQuantity || 1;

  if (stock === 0 || quantity > stock) {
    return { status: 403, response: { msg: "stock not available" } };
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
      quantity,
      ...body,
    },
  };

  await Order.updateById(orderId, data);

  return { status: 200, response: { url, orderId, msg: "orderId is from db" } };
};

const getOrderData = async (orderId: string) => {
  const order = (await Order.findById(orderId)).data();

  if (!order) {
    return { status: 404, response: { msg: "order not found" } };
  }

  return { status: 200, response: order };
};

const ipnMercadoPago = async (query) => {
  const { id, topic } = query;

  if (topic === "merchant_order") {
    const { body } = await getMerchantOrder(id);

    const { order_status: status, external_reference: refId } = body;

    if (status === "paid") {
      const {
        productId,
        aditional_info,
        status: refStatus,
        url,
      } = (await Order.findById(refId)).data();

      await Order.updateById(refId, {
        status,
        url: null,
      });

      if (refStatus !== "paid" && url) {
        const { quantity } = aditional_info;

        const { objectID, stock }: any = await Product.findById(productId);

        await Product.updateStock(objectID, stock, quantity);
      }
    } else {
      await Order.updateById(refId, { status });
    }
  }

  return "ok";
};

export { createOrder, getOrderData, ipnMercadoPago };
