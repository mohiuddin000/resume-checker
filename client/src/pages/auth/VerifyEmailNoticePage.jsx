import { Link } from "react-router-dom";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const VerifyEmailNoticePage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md text-center">
                <div className="mb-4 text-6xl">📧</div>

                <h1 className="mb-3 text-3xl font-bold">Verify Your Email</h1>

                <p className="mb-6 text-gray-600">
                    We've sent a verification link to your email address. Please
                    check your inbox (and spam folder if necessary) and click
                    the link to activate your account.
                </p>

                <Link to="/login">
                    <Button>Back to Login</Button>
                </Link>
            </Card>
        </div>
    );
};

export default VerifyEmailNoticePage;
