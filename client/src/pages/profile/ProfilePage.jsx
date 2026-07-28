import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

import { useAuth } from "../../hooks/useAuth";
import { resendVerificationEmail } from "../../services/auth.service";
import { useState } from "react";

const ProfilePage = () => {
    const { user } = useAuth();
    const [sendingVerification, setSendingVerification] = useState(false);

    const handleResendVerification = async () => {
        try {
            setSendingVerification(true);

            const response = await resendVerificationEmail();

            toast.success(
                response.message || "Verification email sent successfully.",
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to send verification email.",
            );
        } finally {
            setSendingVerification(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="mx-auto max-w-5xl p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">My Profile</h1>

                    <p className="mt-2 text-gray-600">
                        Manage your account information and quickly access
                        important actions.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* User Information */}
                    <Card className="lg:col-span-2 p-6">
                        <div className="mb-6 flex items-center gap-5">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">
                                    {user?.name}
                                </h2>

                                <p className="text-gray-500">
                                    Resume Matcher User
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Full Name
                                </label>

                                <p className="mt-1 text-lg font-medium">
                                    {user?.name}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-500">
                                    Email Address
                                </label>

                                <p className="mt-1 text-lg font-medium">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold">Quick Actions</h2>

                        <p className="mt-2 text-gray-500">
                            Manage your account.
                        </p>

                        <div className="mt-6 space-y-3">
                            <Link to="/change-password">
                                <Button className="w-full">
                                    Change Password
                                </Button>
                            </Link>

                            <Link to="/resumes">
                                <Button variant="secondary" className="w-full">
                                    Resume History
                                </Button>
                            </Link>

                            <Link to="/dashboard">
                                <Button variant="secondary" className="w-full">
                                    Dashboard
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Account Information */}
                <Card className="mt-6 p-6">
                    <h2 className="text-xl font-bold">Account Information</h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-3">
                        <div>
                            <p className="text-sm text-gray-500">
                                Account Status
                            </p>

                            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                Active
                            </span>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Authentication
                            </p>

                            <p className="mt-2 font-semibold">JWT</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Resume Analysis
                            </p>

                            <p className="mt-2 font-semibold">AI Powered</p>
                        </div>
                    </div>
                </Card>

                <Card className="mt-6 p-6">
                    <h2 className="text-xl font-bold">Email Verification</h2>

                    {user?.isEmailVerified ? (
                        <div className="mt-4">
                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                ✅ Verified
                            </span>

                            <p className="mt-3 text-gray-600">
                                Your email address has been verified.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                                ⚠️ Not Verified
                            </span>

                            <p className="mt-3 text-gray-600">
                                Your email address has not been verified yet.
                                Verify it to keep your account secure.
                            </p>

                            <Button
                                className="mt-5"
                                loading={sendingVerification}
                                onClick={handleResendVerification}
                            >
                                Resend Verification Email
                            </Button>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
};

export default ProfilePage;
