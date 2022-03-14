import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { verifyJwt } from "lib/jwt";

const verifyBearer = (req: NextApiRequest, res: NextApiResponse) => {
  const token = parseToken(req);

  if (!token) {
    res.status(400).json({ msg: "token not found" });
  }

  const decodedToken = verifyJwt(token);

  if (!decodedToken) {
    res.status(401).json({ msg: "token not authorized" });
  }

  return decodedToken;
};

export { verifyBearer };
