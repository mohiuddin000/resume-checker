import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { register as registerUser } from "../../services/auth.service";

import {
    emailValidation,
    nameValidation,
    passwordValidation,
    confirmPasswordValidation,
} from "../../utils/validators";

const RegisterPage = () => {
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
            const response = await registerUser(data);

            toast.success(response.message);

            navigate("/verify-email");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed.",
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Create Account
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Register to start using AI Resume Matcher
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        {...register("name", nameValidation)}
                        error={errors.name?.message}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", emailValidation)}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        {...register("password", passwordValidation)}
                        error={errors.password?.message}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        {...register(
                            "confirmPassword",
                            confirmPasswordValidation(password),
                        )}
                        error={errors.confirmPassword?.message}
                    />

                    <Button type="submit" loading={isSubmitting}>
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
