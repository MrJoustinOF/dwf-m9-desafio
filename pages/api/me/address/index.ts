import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import {
  validateSchema,
  authMiddleware,
  corsMiddleware,
} from "utils/middlewares";
import { updateMyAddressSchema } from "utils/schemas";
import { updateMyAddress } from "controllers/user.controller";

const handler = async (req: NextApiRequest, res: NextApiResponse, token) => {
  const { id } = token;
  const { address } = req.body;

  const { msg } = await updateMyAddress(address, id);

  res.json({ msg });
};

const patch = validateSchema(authMiddleware(handler), updateMyAddressSchema);

export default corsMiddleware(
  methods({
    patch,
  })
);
