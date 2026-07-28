import Spinner from "./Spinner";

const Button = ({
    children,
    loading = false,
    disabled = false,
    type = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

    const widths = fullWidth ? "w-full" : "";

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button
            type={type}
            disabled={loading || disabled}
            className={`${baseStyles} ${widths} ${sizes[size]} ${variants[variant]} ${className}`}
            {...props}
        >
            {loading && (
                <span className="mr-2 flex items-center">
                    <Spinner size="sm" />
                </span>
            )}

            <span>{children}</span>
        </button>
    );
};

export default Button;
