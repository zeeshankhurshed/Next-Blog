import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/config.js';
import blogRouter from './routes/blog.js';
import commentRouter from './routes/comment.js';
import userRouter from './routes/user.js';
import { errorMiddleWare } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Specify the extended option

const allowedOrigins = ['http://localhost:3000']; // Replace with your client URL
app.use(cors({
  origin: allowedOrigins, // Allow requests from this origin
  credentials: true, // Include credentials (cookies, etc.) in requests
}));

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);

app.use(errorMiddleWare)
// Start server
const PORT = process.env.SERVER_PORT || 7500;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
