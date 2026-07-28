const Card = ({
    children,
    className = "",
    hover = false,
    padding = "md",
    bordered = false,
    onClick,
}) => {
    const paddings = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    return (
        <div
            onClick={onClick}
            className={`
                rounded-xl
                bg-white
                shadow-md
                ${paddings[padding]}
                ${hover ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" : ""}
                ${bordered ? "border border-gray-200" : ""}
                ${onClick ? "cursor-pointer" : ""}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export default Card;
