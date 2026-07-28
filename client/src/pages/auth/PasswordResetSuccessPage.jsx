import { Link } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const PasswordResetSuccessPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md text-center">
                <div className="mb-4 text-6xl">✅</div>

                <h1 className="mb-3 text-3xl font-bold">Password Updated</h1>

                <p className="mb-6 text-gray-600">
                    Your password has been changed successfully. You can now
                    sign in using your new password.
                </p>

                <Link to="/login">
                    <Button>Go to Login</Button>
                </Link>
            </Card>
        </div>
    );
};

export default PasswordResetSuccessPage;
