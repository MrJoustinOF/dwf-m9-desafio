import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import { getCode, getToken } from "controllers/auth.controller";

const getCodeSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const getTokenSchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.number().required(),
});

const getCodeAuthMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await getCodeSchema.validate(req.body);
  } catch (e) {
    res.status(400).json({ field: "body", message: e });
  }

  await getCode(req, res);
};

const getTokenMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await getTokenSchema.validate(req.body);
  } catch (e) {
    res.status(400).json({ field: "body", message: e });
  }

  await getToken(req, res);
};

export { getCodeAuthMiddleware, getTokenMiddleware };
