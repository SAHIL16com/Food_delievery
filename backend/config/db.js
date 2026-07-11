import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI not configured in env variables.");
        }
        await mongoose.connect(uri);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
}
