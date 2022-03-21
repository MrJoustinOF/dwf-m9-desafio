import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import {
  getMyDataMiddleware,
  updateMyDataMiddleware,
} from "middlewares/user.middleware";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, response } = await getMyDataMiddleware(req);

  res.status(status).json(response);
};

const patch = async (req: NextApiRequest, res: NextApiResponse) => {
  const { status, response } = await updateMyDataMiddleware(req);

  res.status(status).json(response);
};

export default methods({
  get,
  patch,
});
