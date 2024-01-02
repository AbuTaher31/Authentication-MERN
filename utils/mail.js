import nodemailer from "nodemailer";

export const sendMail = ({ to, sub, msg }) => {
  //create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,

    auth: {
      user: "at908324@gmail.com",
      pass: "jgpg heqr cnjs hajg",
    },
  });

  //send mail
  transporter.sendMail({
    from: "at908324@gmail.com",
    to: to,
    subject: sub,
    text: msg,
  });
};
