import gen from "random-seed";
import addMinutes from "date-fns/addMinutes";
import isAfter from "date-fns/isAfter";
import { Auth } from "models/Auth";
import { User } from "models/User";
import { genJwt } from "lib/jwt";
import { sendEmailCode } from "lib/sendgrid";

const getCode = async (userEmail: string) => {
  const email = userEmail.trim().toLowerCase();

  const ref = await Auth.find(email);

  const random = gen.create();
  const code = random.intBetween(1e4, 99_999);

  const date = new Date();
  const expires = addMinutes(date, 20);

  if (ref) {
    const { id } = ref;

    await Auth.updateById(id, { code, expires });
  } else {
    const name = email.slice(0, email.indexOf("@"));
    const lastname = "";
    const address = {};

    const userId = await User.createAuthRef({ name, lastname, address });

    await Auth.createDoc({
      email,
      code,
      expires,
      userId,
    });
  }

  await sendEmailCode(email, code);

  return { msg: "email has been sent" };
};

const getToken = async (userEmail, code) => {
  const email = userEmail.trim().toLowerCase();

  const ref = await Auth.find(email);

  if (ref) {
    const { code: refCode, expires, userId: id } = ref.data();
    const expireDate = expires.toDate();
    const now = new Date();

    if (isAfter(now, expireDate)) {
      return { error: 400, msg: "code expired" };
    }

    if (!refCode) {
      return { error: 400, msg: "code already used" };
    }

    if (parseInt(refCode) !== parseInt(code)) {
      return { error: 403, msg: "wrong code" };
    }

    const { id: authId } = ref;
    await Auth.setCodeAsInvalid(authId);

    const token = genJwt({ id });

    return { token };
  } else {
    return { msg: "email not found" };
  }
};

export { getCode, getToken };
