import mongoose from "mongoose";

async function connectDatabase() {
    const { MONGODB_URI } = process.env;

    if (!MONGODB_URI) {
        throw new Error(
            "MONGODB_URI is not configured. Add it to server/.env.",
        );
    }

    await mongoose.connect(MONGODB_URI);
}

export default connectDatabase;
