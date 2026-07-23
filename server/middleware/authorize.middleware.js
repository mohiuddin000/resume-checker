import AppError from "../utils/AppError.js";

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Authentication required.", 401));
        }

        const isAuthorized = roles.includes(req.user.role);

        if (!isAuthorized) {
            return next(new AppError("Forbidden.", 403));
        }

        next();
    };
};

export default authorize;
