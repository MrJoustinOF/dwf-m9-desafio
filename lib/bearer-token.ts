import type { NextApiRequest } from "next";
import parseToken from "parse-bearer-token";
import { verifyJwt } from "lib/jwt";

const verifyBearer = (req: NextApiRequest) => {
  const token = parseToken(req);

  if (!token) {
    return { status: 400, response: { msg: "token not found" } };
  }

  const decodedToken = verifyJwt(token);

  if (!decodedToken) {
    return { status: 403, response: { msg: "token not authorized" } };
  }

  return decodedToken;
};

export { verifyBearer };
