import crypto from "crypto";

export const generateEmailVerificationToken = () => {
    // Token sent to user
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Hash stored in database
    const hashedToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    return {
        verificationToken,
        hashedToken,
    };
};
