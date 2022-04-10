import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware, validateSchema } from "utils/middlewares";
import { updateMyDataSchema } from "utils/schemas";
import { getMyData, updateMyData } from "controllers/user.controller";

const getHandler = async (req: NextApiRequest, res: NextApiResponse, token) => {
  const { id } = token;

  const data = await getMyData(id);

  res.json(data);
};

const patchHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token
) => {
  const { name, lastname } = req.body;
  const { id } = token;

  const { msg } = await updateMyData({ name, lastname }, id);

  res.json({ msg });
};

const get = authMiddleware(getHandler);
const patch = validateSchema(authMiddleware(patchHandler), updateMyDataSchema);

export default methods({
  get,
  patch,
});
