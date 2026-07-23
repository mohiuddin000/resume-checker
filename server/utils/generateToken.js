import jwt from "jsonwebtoken";
import AppError from "./AppError.js";

function generateToken(userId) {
    if (!process.env.JWT_SECRET) {
        throw new AppError("JWT_SECRET is not configured.", 500);
    }

    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
}

export default generateToken;
