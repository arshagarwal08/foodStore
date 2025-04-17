import mongoose from "mongoose";

export const connectDB = async () => {
    const URL = process.env.MONGO_URI;
    await mongoose.connect(URL).then(()=>console.log("DB connected"))
}