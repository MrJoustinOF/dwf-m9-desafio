import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getCodeMiddleware } from "middlewares/auth.middleware";
import { getCode } from "controllers/auth.controller";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  const { status, response } = await getCodeMiddleware(body, getCode);

  res.status(status).json(response);
};

export default methods({
  post,
});
