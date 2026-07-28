import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { useAuth } from "../../hooks/useAuth";

import { emailValidation, passwordValidation } from "../../utils/validators";

import toast from "react-hot-toast";

const LoginPage = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await login(data);

            toast.success(response.message);

            navigate("/dashboard");
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Welcome Back
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Login to continue
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                        placeholder="Enter your password"
                        {...register("password", passwordValidation)}
                        error={errors.password?.message}
                    />

                    <Button type="submit" loading={isSubmitting}>
                        Login
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <Link
                        to="/forgot-password"
                        className="text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
