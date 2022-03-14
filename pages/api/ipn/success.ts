import methods from "micro-method-router";
import { NextApiRequest, NextApiResponse } from "next";

const get = (req: NextApiRequest, res: NextApiResponse) => {
  res.send("everything ok");
};

export default methods({
  get,
});
