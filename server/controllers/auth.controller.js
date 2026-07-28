import {
    changePassword,
    getSafeUser,
    loginUser,
    register,
    resendVerificationEmail,
    resetPassword,
    verifyEmail,
} from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import cookieOptions from "../utils/cookieOptions.js";
import { forgotPassword } from "../services/auth.service.js";
import sendEmail from "../utils/sendEmail.js";

// export const registerUser = asyncHandler(async (req, res) => {

//     //const data = await registerUser(req.body);

//     const { user, token } = await register(req.body);

//     res.cookie("token", token, cookieOptions);

//     res.status(201).json({
//         success: true,
//         message: "Registration successful.",
//         user,
//     });
// });

export const registerUser = asyncHandler(async (req, res) => {
    const { user, token, verificationToken } = await register(req.body);

    res.cookie("token", token, cookieOptions);

    const verificationURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendEmail({
        to: user.email,
        subject: "Email Verification",
        text: `Verify your email using this link:\n\n${verificationURL}\n\nThis link expires in 10 minutes.`,
    });

    res.status(201).json({
        success: true,
        message:
            "Registration successful. Please check your email to verify your account.",
        user,
    });
});
export const login = asyncHandler(async (req, res) => {
    const { user, token } = await loginUser(req.body);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
        success: true,
        message: "Login successful.",
        user,
    });
});

export const getProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Profile retrieved successfully.",
        data: {
            user: getSafeUser(req.user),
        },
    });
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", cookieOptions);

    res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    });
});

export const forgotPasswordController = asyncHandler(async (req, res) => {
    const { user, resetToken, success, message } = await forgotPassword(
        req.body.email,
    );

    // User doesn't exist
    if (!user) {
        return res.status(200).json({
            success,
            message,
        });
    }

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: `Reset your password using this link:\n\n${resetURL}\n\nThis link expires in 10 minutes.`,
    });

    res.status(200).json({
        success: true,
        message: "Password reset link sent successfully.",
    });
});

export const resetPasswordController = asyncHandler(async (req, res) => {
    //const { token, password } = req.body;
    const { token } = req.params;
    const { password } = req.body;

    const result = await resetPassword(token, password);

    res.status(200).json(result);
});

export const changePasswordController = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const result = await changePassword(
        req.user._id,
        currentPassword,
        newPassword,
    );

    res.clearCookie("token");

    res.status(200).json(result);
});

export const verifyEmailController = asyncHandler(async (req, res) => {
    const { token } = req.params;

    const result = await verifyEmail(token);

    res.status(200).json(result);
});

export const resendVerificationEmailController = asyncHandler(
    async (req, res) => {
        const { user, verificationToken } = await resendVerificationEmail(
            req.user.email,
        );

        const verificationURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        await sendEmail({
            to: user.email,
            subject: "Email Verification",
            text: `Verify your email using this link:\n\n${verificationURL}\n\nThis link expires in 24 hours.`,
        });

        res.status(200).json({
            success: true,
            message: "Verification email resent successfully.",
        });
    },
);
