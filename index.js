import express from 'express';
import dotenv from 'dotenv';
import limiter from './middleware/rateLimiter.js';
import booksRouter from './routes/books.routes.js';
import { connectDB } from "./config/db.js";


dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);

connectDB();


app.use('/auth', booksRouter);
app.use('/books', booksRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
