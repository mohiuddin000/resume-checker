import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/layout/ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ResumeHistoryPage from "../pages/resume/ResumeHistoryPage";
import ResumeDetailsPage from "../pages/resume/ResumeDetailsPage";
import ChangePasswordPage from "../pages/profile/ChangePasswordPage";
import VerifyEmailNoticePage from "../pages/auth/VerifyEmailNoticePage";
import ResumeAnalysisPage from "../pages/resume/ResumeAnalysisPage";
import ResetEmailSentPage from "../pages/auth/ResetEmailSentPage";
import PasswordResetSuccessPage from "../pages/auth/PasswordResetSuccessPage";
import ProfilePage from "../pages/profile/ProfilePage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
            />

            <Route path="/verify-email" element={<VerifyEmailNoticePage />} />
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
            <Route path="/reset-email-sent" element={<ResetEmailSentPage />} />
            <Route
                path="/password-reset-success"
                element={<PasswordResetSuccessPage />}
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/resumes" element={<ResumeHistoryPage />} />
                {/* <Route path="/resumes/:id" element={<ResumeDetailsPage />} /> */}
                <Route
                    path="/change-password"
                    element={<ChangePasswordPage />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/resumes" element={<ResumeHistoryPage />} />

                <Route path="/resumes/:id" element={<ResumeAnalysisPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
