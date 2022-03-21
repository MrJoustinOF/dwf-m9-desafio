import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { updateMyAddressMiddleware } from "middlewares/user.middleware";

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, response } = await updateMyAddressMiddleware(req);

  res.status(status).json(response);
};

export default methods({
  patch,
});
