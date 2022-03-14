import type { JwtPayload } from "jsonwebtoken";
import test from "ava";
import { genJwt, verifyJwt } from "./jwt";

test("Generating and verifying JWT", (t) => {
  const payload = {
    name: "Jous",
    email: "eljous@eljous.com",
  };

  const token = genJwt(payload);
  const decodedToken = verifyJwt(token) as JwtPayload;
  delete decodedToken.iat;

  t.deepEqual(payload, decodedToken);
});
