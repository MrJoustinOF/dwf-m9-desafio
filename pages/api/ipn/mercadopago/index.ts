import type { NextApiRequest, NextApiResponse } from "next";
import { ipnMercadoPago } from "controllers/order.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, topic } = req.query;

  const msg = await ipnMercadoPago(id, topic);

  res.send(msg);
};

export default handler;
