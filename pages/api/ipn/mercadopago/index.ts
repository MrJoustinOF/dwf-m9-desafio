import type { NextApiRequest, NextApiResponse } from "next";
import { ipnMercadoPago } from "controllers/order.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  const msg = await ipnMercadoPago(query);

  res.send(msg);
};

export default handler;
