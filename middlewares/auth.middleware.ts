import * as yup from "yup";

const getCodeSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const getTokenSchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.number().required(),
});

const useAuthMiddleware = async (schema, data, cb) => {
  try {
    await schema.validate(data);

    const res = await cb(data);

    return res;
  } catch (e) {
    return { status: 400, response: { field: "body", message: e } };
  }
};

const getCodeMiddleware = async (body, cb) =>
  await useAuthMiddleware(getCodeSchema, body, cb);

const getTokenMiddleware = async (body, cb) =>
  await useAuthMiddleware(getTokenSchema, body, cb);

export { getCodeMiddleware, getTokenMiddleware };
