const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password
    },
  });
  // 2) Define email options (like from, to, subject, email content)
  const mailoptions = {
    from: "E-shop App <koxey57385@aravites.com>",
    to: options.email, // recipient's email address
    subject: options.subject, // email subject
    text: options.message, // plain text body
  };
  // 3) Send email
  await transporter.sendMail(mailoptions);
};

module.exports = sendEmail;
