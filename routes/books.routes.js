import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import cache from '../middlewares/cache.middleware.js';
import rateLimiter from '../middlewares/rateLimiter.middleware.js';
import { getBook,addBook,updateBook,deleteBook } from '../controllers/books.controller.js';

const bookRouter = express.Router();


bookRouter.use(rateLimiter);

bookRouter.post('/', authMiddleware, addBook);

bookRouter.get('/', authMiddleware,cache, getBook);

bookRouter.put('/:id', authMiddleware, updateBook);

bookRouter.delete('/:id', authMiddleware,deleteBook);

export default bookRouter;
