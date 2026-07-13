import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);


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
