import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connected at port:', res.connection.port);
    } catch (error) {
        console.log('Connection error:', error);
    }
};
