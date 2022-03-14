import type { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";
import {
  getMyData,
  updateMyData,
  updateMyAddress,
} from "controllers/user.controller";
import { verifyBearer } from "lib/bearer-token";

const updateMyDataSchema = yup
  .object()
  .shape({
    name: yup.string(),
    lastname: yup.string(),
  })
  .noUnknown(true)
  .strict();

const updateMyAddressSchema = yup
  .object()
  .shape({
    address: yup.object(),
  })
  .noUnknown(true)
  .strict();

const getMyDataMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const decodedToken = verifyBearer(req, res);

  await getMyData(req, res, decodedToken);
};

const updateMyDataMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const decodedToken = verifyBearer(req, res);

  try {
    await updateMyDataSchema.validate(req.body);
  } catch (e) {
    res.status(400).json({ field: "body", message: e });
  }

  await updateMyData(req, res, decodedToken);
};

const updateMyAddressMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const decodedToken = verifyBearer(req, res);

  try {
    await updateMyAddressSchema.validate(req.body);
  } catch (e) {
    res.status(400).json({ field: "body", message: e });
  }

  await updateMyAddress(req, res, decodedToken);
};

export {
  getMyDataMiddleware,
  updateMyDataMiddleware,
  updateMyAddressMiddleware,
};
