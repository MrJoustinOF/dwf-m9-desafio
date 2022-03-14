import * as sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, SENDGRID_EMAIL: from } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmailCode = async (to: string, code: number) => {
  const msg = {
    to,
    from,
    subject: "Code to verify - DWF M9 DESAFIO",
    html:
      "<h1>Here is your code to sign in</h1><hr/><br/><h2>" +
      code +
      "</h2><p>You have 20 minutes to use it, otherwise it will expire</p>",
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

export { sendEmailCode };
