import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { verifyJwt } from "lib/jwt";

const authMiddleware = (cb) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = parseToken(req);

    if (!token) {
      res.status(400).send({ msg: "token not found" });
    }

    const decodedToken = verifyJwt(token);

    if (!decodedToken) {
      res.status(403).json({ msg: "token not authorized" });
    }

    await cb(req, res, decodedToken);
  };
};

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PATCH"],
  })
);

const corsMiddleware = (cb) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    await cb(req, res);
  };
};

const validateSchema = (cb, schema) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await schema.validate(req);

      await cb(req, res);
    } catch (e) {
      res.status(400).send("error validating req");
    }
  };
};

export { authMiddleware, validateSchema, corsMiddleware };
