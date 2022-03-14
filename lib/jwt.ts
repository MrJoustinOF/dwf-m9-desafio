import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const genJwt = (obj: any) => {
  const token = jwt.sign(obj, JWT_SECRET);

  return token;
};

const verifyJwt = (token: string) => {
  try {
    const obj = jwt.verify(token, JWT_SECRET);

    return obj;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export { genJwt, verifyJwt };
