import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const create = async () => {
  let testAccount = !!process.env.SMTP_USER
    ? { user: "", pass: "" }
    : await nodemailer.createTestAccount();

  const auth = {
    user: !!process.env.SMTP_USER ? process.env.SMTP_USER : testAccount.user,
    pass: !!process.env.SMTP_PASS ? process.env.SMTP_PASS : testAccount.pass,
  };

  console.log(auth);

  return {
    auth,
    transporter: nodemailer.createTransport({
      host: !!process.env.SMTP_HOST
        ? process.env.SMTP_HOST
        : "smtp.ethereal.email",
      port:
        parseInt(!!process.env.SMTP_PORT ? process.env.SMTP_PORT : "587") ??
        587,
      secure: !!process.env.TLS,
      auth,
    }),
  };
};

const send = async ({
  auth,
  transporter,
}: {
  auth: { user: string; pass: string };
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
}) => {
  const testEmail = readFileSync("./test-mail.html");
  return await transporter.sendMail({
    from: !!process.env.SMTP_USER ? process.env.SMTP_USER : auth.user,
    to: process.env.RECV_USER ?? "",
    subject: "an email from the wild wild web 🤠",
    text: "Howdy there partner :)",
    html: testEmail,
  });
};

const sendEmail = async () => {
  const transporter = await create();
  const info = await send(transporter);

  console.log("Message ID: %s", info.messageId);
  console.log("Preview: %s", nodemailer.getTestMessageUrl(info));
};

sendEmail().catch((err) => {
  console.log(err);
  console.log("yikes error...");
});
