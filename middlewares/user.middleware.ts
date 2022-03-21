import type { NextApiRequest } from "next";
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

const getMyDataMiddleware = async (req: NextApiRequest) => {
  const decodedToken: any = verifyBearer(req);

  if (decodedToken.status && decodedToken.response) {
    const { status, response } = decodedToken;

    return { status, response };
  }

  const res = await getMyData(decodedToken);

  return res;
};

const useUserMiddleware = async (schema, req: NextApiRequest, cb) => {
  const decodedToken: any = verifyBearer(req);

  if (decodedToken.status && decodedToken.response) {
    const { status, response } = decodedToken;

    return { status, response };
  }

  try {
    const { body } = req;

    await schema.validate(body);

    const res = await cb(body, decodedToken);

    return res;
  } catch (e) {
    return { status: 400, response: { field: "body", message: e } };
  }
};

const updateMyDataMiddleware = async (req: NextApiRequest) =>
  useUserMiddleware(updateMyDataSchema, req, updateMyData);

const updateMyAddressMiddleware = async (req: NextApiRequest) =>
  useUserMiddleware(updateMyAddressSchema, req, updateMyAddress);

export {
  getMyDataMiddleware,
  updateMyDataMiddleware,
  updateMyAddressMiddleware,
};
