import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export async function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtppro.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL_USER,
        pass: process.env.ZOHO_EMAIL_PASS,
      },
    });

    // Verify transporter once
    try {
      await transporter.verify();
      console.log("SMTP connection verified.");
    } catch (error) {
      console.error("SMTP Connection Error:", error);
      throw new Error("SMTP connection failed");
    }
  }
  return transporter;
}
