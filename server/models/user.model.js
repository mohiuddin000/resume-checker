import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long."],
            maxlength: [100, "Name cannot exceed 100 characters."],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Provide a valid email address.",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [8, "Password must be at least 8 characters long."],
            select: false,
        },
        passwordResetToken: {
            type: String,
            default: null,
        },

        passwordResetExpires: {
            type: Date,
            default: null,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationToken: {
            type: String,
        },

        emailVerificationExpires: {
            type: Date,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (document, returnedObject) => {
                delete returnedObject.password;
                delete returnedObject.__v;
                return returnedObject;
            },
        },
    },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
