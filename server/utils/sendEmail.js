import nodemailer from "nodemailer";
import AppError from "./AppError.js";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });
    } catch (error) {
        throw new AppError("Failed to send email.", 500);
    }
};

export default sendEmail;
