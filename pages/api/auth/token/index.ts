import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getTokenMiddleware } from "middlewares/auth.middleware";
import { getToken } from "controllers/auth.controller";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  const { status, response } = await getTokenMiddleware(body, getToken);

  res.status(status).json(response);
};

export default methods({
  post,
});
