import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { corsMiddleware, validateSchema } from "utils/middlewares";
import { getCodeSchema } from "utils/schemas";
import { getCode } from "controllers/auth.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  const { msg } = await getCode(email);

  res.json({ msg });
};

const post = validateSchema(handler, getCodeSchema);

export default corsMiddleware(
  methods({
    post,
  })
);
