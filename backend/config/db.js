import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb+srv://sahil:sahilmishra123@cluster0.hn50xdr.mongodb.net/food-del';
        await mongoose.connect(uri);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
    }
}
