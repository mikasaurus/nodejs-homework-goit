import nodemailer from "nodemailer";
import "dotenv/config";

export const config = {
  host: "smtp.mailgun.org",
  port: 587,
  secure: true,
  auth: {
    user: "postmaster@sandbox0e234c561aea43868013def31c7f6ddf.mailgun.org",
    pass: process.env.API_KEY,
  },
};

const transporter = nodemailer.createTransport(config);

const emailOptions = {
  from: "no-reply@sandbox0e234c561aea43868013def31c7f6ddf.mailgun.org",
  to: "user.email",
  subject: "Important message",
  text: "Yoooooooooo hoooooooooooooooo!",
};

await transporter.sendMail(emailOptions);
