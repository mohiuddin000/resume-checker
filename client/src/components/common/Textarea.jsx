import { forwardRef, useId } from "react";

const Textarea = forwardRef(
    (
        { id, label, error, helperText, rows = 8, className = "", ...props },
        ref,
    ) => {
        const generatedId = useId();
        const textareaId = id || generatedId;

        return (
            <div className="mb-4">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}

                <textarea
                    id={textareaId}
                    ref={ref}
                    rows={rows}
                    aria-invalid={!!error}
                    aria-describedby={
                        error
                            ? `${textareaId}-error`
                            : helperText
                              ? `${textareaId}-helper`
                              : undefined
                    }
                    className={`w-full rounded-lg border px-4 py-2.5 outline-none transition-all duration-200 resize-y
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${className}`}
                    {...props}
                />

                {helperText && !error && (
                    <p
                        id={`${textareaId}-helper`}
                        className="mt-1 text-sm text-gray-500"
                    >
                        {helperText}
                    </p>
                )}

                {error && (
                    <p
                        id={`${textareaId}-error`}
                        className="mt-1 text-sm text-red-500"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

Textarea.displayName = "Textarea";

export default Textarea;
