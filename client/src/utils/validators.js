export const emailValidation = {
    required: "Email is required",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
    },
};

export const passwordValidation = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
    },
};

export const confirmPasswordValidation = (password) => ({
    required: "Please confirm your password",
    validate: (value) => value === password || "Passwords do not match",
});

export const nameValidation = {
    required: "Name is required",
    minLength: {
        value: 2,
        message: "Name must be at least 2 characters long",
    },
    maxLength: {
        value: 50,
        message: "Name cannot exceed 50 characters",
    },
};

export const requiredField = (fieldName) => ({
    required: `${fieldName} is required`,
});

export const jobDescriptionValidation = {
    required: "Job description is required",
    minLength: {
        value: 20,
        message: "Please enter a more detailed job description",
    },
};
