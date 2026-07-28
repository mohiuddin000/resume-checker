import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { changePassword } from "../../services/auth.service";

import {
    passwordValidation,
    confirmPasswordValidation,
} from "../../utils/validators";
import { useAuth } from "../../hooks/useAuth";

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        try {
            const response = await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            toast.success(
                "Password changed successfully. Please sign in again.",
            );

            reset();

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to change password.",
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Change Password
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Update your account password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Current Password"
                        type="password"
                        placeholder="Current password"
                        {...register("currentPassword", passwordValidation)}
                        error={errors.currentPassword?.message}
                    />

                    <Input
                        label="New Password"
                        type="password"
                        placeholder="New password"
                        {...register("newPassword", passwordValidation)}
                        error={errors.newPassword?.message}
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm new password"
                        {...register(
                            "confirmPassword",
                            confirmPasswordValidation(newPassword),
                        )}
                        error={errors.confirmPassword?.message}
                    />

                    <Button type="submit" loading={isSubmitting}>
                        Update Password
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ChangePasswordPage;
