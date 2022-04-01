import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { validateSchema } from "utils/middlewares";
import { getCodeSchema } from "utils/schemas";
import { getCode } from "controllers/auth.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const data = await getCode(email);

  res.json(data);
};

const post = validateSchema(handler, getCodeSchema);

export default methods({
  post,
});
