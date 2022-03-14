import methods from "micro-method-router";
import { getTokenMiddleware as post } from "middlewares/auth.middleware";

export default methods({
  post,
});
