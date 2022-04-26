import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { gen_cool_word, gen_crazy_word } from "./words";
import { get_current_day, get_current_month } from "./time_util";

const create_connection = async () => {
  let testAccount = !!process.env.SMTP_USER
    ? { user: "", pass: "" }
    : await nodemailer.createTestAccount();
  const auth = {
    user: !!process.env.SMTP_USER ? process.env.SMTP_USER : testAccount.user,
    pass: !!process.env.SMTP_PASS ? process.env.SMTP_PASS : testAccount.pass,
  };
  return {
    auth,
    transporter: nodemailer.createTransport({
      host: !!process.env.SMTP_HOST
        ? process.env.SMTP_HOST
        : "smtp.ethereal.email",
      port:
        parseInt(!!process.env.SMTP_PORT ? process.env.SMTP_PORT : "587") ??
        587,
      secure: false,
      auth,
    }),
  };
};

const send_email = async ({
  auth,
  transporter,
}: {
  auth: { user: string; pass: string };
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
}) => {
  const subject = `${get_current_month()}, ${get_current_day()} - a ${gen_crazy_word()} yet ${gen_cool_word} email`;
  const testEmail = readFileSync("./emails/test-mail.html");
  return await transporter.sendMail({
    from: !!process.env.SMTP_USER ? process.env.SMTP_USER : auth.user,
    to: process.env.RECV_USER ?? "",
    subject,
    html: testEmail,
  });
};

const sendEmail = async () => {
  await create_connection().then((transporter) => {
    send_email(transporter).then((status) => {
      console.log("Message ID: %s", status.messageId);
      console.log("Preview: %s", nodemailer.getTestMessageUrl(status));
    });
  });
};

sendEmail()
  .catch((err) => {
    console.log(err);
    console.log("yikes error...");
  })
  .finally(() => {
    console.log("done");
  });
