import AppError from "../utils/AppError.js";

export function notFound(req, res, next) {
    next(
        new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404),
    );
}

export function errorHandler(error, req, res, next) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "An unexpected server error occurred.";
    const status = error.status || "error";

    if (error.code === 11000) {
        statusCode = 409;
        message = "An account with this email already exists.";
    }

    if (error.name === "ValidationError") {
        statusCode = 400;
        message =
            Object.values(error.errors)[0]?.message || "Validation failed.";
    }

    if (!error.isOperational && statusCode === 500) {
        console.error(error);
        message = "An unexpected server error occurred.";
    }

    res.status(statusCode).json({
        success: false,
        status,
        message: error.message || "Internal Server Error",
    });
}
