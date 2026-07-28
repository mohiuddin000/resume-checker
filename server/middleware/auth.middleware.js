import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
    //const authorization = req.headers.authorization;

    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7).trim()
        : null;

    const token = bearerToken || req.cookies?.token;

    if (!token) {
        throw new AppError("Authentication is required.", 401);
    }

    if (!process.env.JWT_SECRET) {
        throw new AppError("JWT_SECRET is not configured.", 500);
    }

    let payload;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        throw new AppError("Invalid or expired token.", 401);
    }

    const user = await User.findById(payload.id);

    if (!user) {
        throw new AppError(
            "The account associated with this token no longer exists.",
            401,
        );
    }

    req.user = user;
    next();
});
