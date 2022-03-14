import methods from "micro-method-router";
import {
  getMyDataMiddleware as get,
  updateMyDataMiddleware as patch,
} from "middlewares/user.middleware";

export default methods({
  get,
  patch,
});
