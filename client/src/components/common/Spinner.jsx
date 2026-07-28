const Spinner = ({ fullScreen = false, size = "md", className = "" }) => {
    const sizes = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-4",
        lg: "h-12 w-12 border-4",
        xl: "h-16 w-16 border-[5px]",
    };

    const spinner = (
        <div
            className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizes[size]} ${className}`}
        />
    );

    if (fullScreen) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default Spinner;
