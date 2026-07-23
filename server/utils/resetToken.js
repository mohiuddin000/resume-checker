import crypto from "crypto";

export const generateResetToken = () => {
    // Token sent to user
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash stored in database
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    return {
        resetToken,
        hashedToken,
    };
};
