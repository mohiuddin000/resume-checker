import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { forgotPassword } from "../../services/auth.service";
import { emailValidation } from "../../utils/validators";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async ({ email }) => {
        try {
            const response = await forgotPassword(email);

            toast.success(response.message);

            navigate("/reset-email-sent");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to send reset email.",
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Forgot Password
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Enter your email address to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", emailValidation)}
                        error={errors.email?.message}
                    />

                    <Button type="submit" loading={isSubmitting}>
                        Send Reset Link
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
