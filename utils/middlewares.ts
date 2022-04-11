import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { verifyJwt } from "lib/jwt";

const authMiddleware = (cb) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = parseToken(req);

    if (!token) {
      res.status(400).json({ msg: "token not found" });
    }

    const decodedToken = verifyJwt(token);

    if (!decodedToken) {
      res.status(403).json({ msg: "token not authorized" });
    }

    await cb(req, res, decodedToken);
  };
};

const cors = Cors({
  methods: ["GET", "POST", "PATCH"],
});

const corsMiddleware = (cb) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
      cors(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        cb(req, res);
        return resolve(result);
      });
    });
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

export { authMiddleware, corsMiddleware, validateSchema };
