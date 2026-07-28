import { Link } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const ResetEmailSentPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md text-center">
                <div className="mb-4 text-6xl">📩</div>

                <h1 className="mb-3 text-3xl font-bold">Check Your Email</h1>

                <p className="mb-6 text-gray-600">
                    We've sent a password reset link to your email address.
                    Follow the instructions in the email to create a new
                    password.
                </p>

                <Link to="/login">
                    <Button>Back to Login</Button>
                </Link>
            </Card>
        </div>
    );
};

export default ResetEmailSentPage;
