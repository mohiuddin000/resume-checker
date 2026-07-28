import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { resetPassword } from "../../services/auth.service";

import {
    passwordValidation,
    confirmPasswordValidation,
} from "../../utils/validators";

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            const response = await resetPassword(token, data.password);

            toast.success(response.message);

            navigate("/password-reset-success");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to reset password.",
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Reset Password
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Create a new password for your account.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                        {...register("password", passwordValidation)}
                        error={errors.password?.message}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm new password"
                        {...register(
                            "confirmPassword",
                            confirmPasswordValidation(password),
                        )}
                        error={errors.confirmPassword?.message}
                    />

                    <Button type="submit" loading={isSubmitting}>
                        Reset Password
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

export default ResetPasswordPage;
