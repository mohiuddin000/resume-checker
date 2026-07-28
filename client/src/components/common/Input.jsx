import { forwardRef, useId } from "react";

const Input = forwardRef(
    ({ id, label, error, helperText, className = "", ...props }, ref) => {
        const generatedId = useId();
        const inputId = id || generatedId;

        return (
            <div className="mb-4">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}

                <input
                    id={inputId}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={
                        error
                            ? `${inputId}-error`
                            : helperText
                              ? `${inputId}-helper`
                              : undefined
                    }
                    className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${className}`}
                    {...props}
                />

                {helperText && !error && (
                    <p
                        id={`${inputId}-helper`}
                        className="mt-1 text-sm text-gray-500"
                    >
                        {helperText}
                    </p>
                )}

                {error && (
                    <p
                        id={`${inputId}-error`}
                        className="mt-1 text-sm text-red-500"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";

export default Input;
