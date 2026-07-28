import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";

import { verifyEmail } from "../../services/auth.service";

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await verifyEmail(token);

                toast.success(response.message);
                setVerified(true);

                setTimeout(() => {
                    navigate("/login");
                }, 2500);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                        "Email verification failed.",
                );
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [token, navigate]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md text-center">
                {verified ? (
                    <>
                        <div className="mb-4 text-6xl">✅</div>

                        <h1 className="mb-3 text-3xl font-bold">
                            Email Verified
                        </h1>

                        <p className="mb-6 text-gray-600">
                            Your email has been verified successfully.
                            Redirecting you to the login page...
                        </p>
                    </>
                ) : (
                    <>
                        <div className="mb-4 text-6xl">❌</div>

                        <h1 className="mb-3 text-3xl font-bold">
                            Verification Failed
                        </h1>

                        <p className="mb-6 text-gray-600">
                            The verification link is invalid or has expired.
                        </p>

                        <Link to="/login">
                            <Button>Back to Login</Button>
                        </Link>
                    </>
                )}
            </Card>
        </div>
    );
};

export default VerifyEmailPage;
