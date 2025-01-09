import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import limiter from './middlewares/rateLimiter.middleware.js';
import authRouter from './routes/users.routes.js';
import booksRouter from './routes/books.routes.js';
import { connectDB } from "./config/db.js";
import cors from 'cors';


dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan("dev"));


connectDB();


app.use('/auth', authRouter);
app.use('/books', booksRouter);

const PORT = process.env.PORT || 3000;


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
