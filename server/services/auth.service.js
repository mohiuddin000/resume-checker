import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import { generateEmailVerificationToken } from "../utils/emailVerificationToken.js";
import generateToken from "../utils/generateToken.js";
import { generateResetToken } from "../utils/resetToken.js";
import crypto from "crypto";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegistrationInput({ name, email, password }) {
    if (!name || !email || !password) {
        throw new AppError("Name, email, and password are required.", 400);
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        throw new AppError("Name must be at least 2 characters long.", 400);
    }

    if (typeof email !== "string" || !emailPattern.test(email.trim())) {
        throw new AppError("Provide a valid email address.", 400);
    }

    if (typeof password !== "string" || password.length < 8) {
        throw new AppError("Password must be at least 8 characters long.", 400);
    }
}

function toSafeUser(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export const register = async ({ name, email, password }) => {
    const cleanedEmail = email.trim().toLowerCase();
    const registrationInput = { name, email: cleanedEmail, password };
    validateRegistrationInput(registrationInput);

    const existingUser = await User.findOne({ email });

    //const existingUser = await User.exists({ email });
    console.log("Existing user:", existingUser); // Log the existing user for debugging

    if (existingUser) {
        throw new AppError("An account with this email already exists.", 409);
    }

    const user = await User.create({
        name: registrationInput.name.trim(),
        email: cleanedEmail,
        password: registrationInput.password,
    });

    const { verificationToken, hashedToken } = generateEmailVerificationToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    return {
        user: toSafeUser(user),
        token: generateToken(user._id.toString()),
        verificationToken,
    };
};

export const loginUser = async (input = { email, password }) => {
    const { email, password } = input ?? {};

    if (!email || !password) {
        throw new AppError("Email and password are required.", 400);
    }

    if (typeof email !== "string" || typeof password !== "string") {
        throw new AppError("Invalid credentials.", 401);
    }

    const user = await User.findOne({
        email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
        throw new AppError("Invalid credentials.", 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new AppError("Invalid credentials.", 401);
    }

    return {
        user: toSafeUser(user),
        token: generateToken(user._id.toString()),
    };
};
export const forgotPassword = async (email) => {
    if (!email) {
        throw new AppError("Email is required.", 400);
    }

    const user = await User.findOne({
        email: email.trim().toLowerCase(),
    });

    // Prevent email enumeration
    if (!user) {
        return {
            success: true,
            message:
                "If an account exists with this email, a password reset link has been sent.",
        };
    }

    const { resetToken, hashedToken } = generateResetToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    return {
        user,
        resetToken,
    };
};

export const resetPassword = async (token, password) => {
    if (!token || !password) {
        throw new AppError("Token and password are required.", 400);
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new AppError("Invalid or expired reset token.", 400);
    }

    user.password = password;

    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    // Logout from all devices
    user.refreshTokens = [];

    await user.save();

    return {
        success: true,
        message: "Password reset successfully.",
    };
};

export const changePassword = async (userId, currentPassword, newPassword) => {
    if (!currentPassword || !newPassword) {
        throw new AppError("Current and new passwords are required.", 400);
    }

    if (currentPassword === newPassword) {
        throw new AppError(
            "New password must be different from current password.",
            400,
        );
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
        throw new AppError("Current password is incorrect.", 401);
    }

    user.password = newPassword;

    user.refreshTokens = [];
    await user.save();

    return {
        success: true,
        message: "Password changed successfully.",
    };
};

export const verifyEmail = async (token) => {
    if (!token) {
        throw new AppError("Verification token is required.", 400);
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new AppError("Invalid or expired verification token.", 400);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save({ validateBeforeSave: false });

    return {
        success: true,
        message: "Email verified successfully.",
    };
};

export const resendVerificationEmail = async (email) => {
    if (!email) {
        throw new AppError("Email is required.", 400);
    }

    const user = await User.findOne({
        email: email.trim().toLowerCase(),
    });

    if (!user) {
        return {
            success: true,
            message:
                "If an account exists, a verification email has been sent.",
        };
    }

    if (user.isEmailVerified) {
        throw new AppError("Email is already verified.", 400);
    }

    const { verificationToken, hashedToken } = generateEmailVerificationToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    return {
        user,
        verificationToken,
    };
};
export function getSafeUser(user) {
    return toSafeUser(user);
}
