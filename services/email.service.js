const transporter = require("../config/mail.config");
const ejs = require("ejs");
const path = require("path");

const sendEmail = async ({ to, subject, templateName, data }) => {
  try {
    const templatePath = path.join(
      __dirname,
      `../templates/${templateName}.ejs`
    );

    const html = await ejs.renderFile(templatePath, {
      ...data,
      logoUrl: `${process.env.BASE_URL}/images/shoptoo-logo.png`
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

module.exports = { sendEmail };