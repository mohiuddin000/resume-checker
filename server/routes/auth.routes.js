import { Router } from "express";
import {
    changePasswordController,
    forgotPasswordController,
    getProfile,
    login,
    logout,
    registerUser,
    resendVerificationEmailController,
    resetPasswordController,
    verifyEmailController,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
router.get("/verify-email/:token", verifyEmailController);

// Protected Routes
router.get("/profile", protect, getProfile);
router.post("/logout", protect, logout);
router.post("/change-password", protect, changePasswordController);
router.post(
    "/resend-verification-email",
    protect,
    resendVerificationEmailController,
);

export default router;
