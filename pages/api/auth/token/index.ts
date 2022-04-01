import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { validateSchema } from "utils/middlewares";
import { getTokenSchema } from "utils/schemas";
import { getToken } from "controllers/auth.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, code } = req.body;

  const data = await getToken(email, code);

  res.json(data);
};

const post = validateSchema(handler, getTokenSchema);

export default methods({
  post,
});
