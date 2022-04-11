import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { corsMiddleware, validateSchema } from "utils/middlewares";
import { getTokenSchema } from "utils/schemas";
import { getToken } from "controllers/auth.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, code } = req.body;

  const { error, msg } = await getToken(email, code);

  if (error) {
    res.status(error).json({ msg });
  }

  res.json({ msg });
};

const post = validateSchema(handler, getTokenSchema);

export default corsMiddleware(
  methods({
    post,
  })
);
