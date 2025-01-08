import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import cache from '../middleware/cache.js';
import rbac from '../middleware/rbac.js';
import { getBook,addBook,updateBook,deleteBook } from '../controllers/books.controller.js';

const bookRouter = express.Router();


bookRouter.post('/', rbac(['Admin']),authMiddleware, addBook);

bookRouter.get('/', authMiddleware,cache, getBook);

bookRouter.put('/:id', rbac(['Admin']),authMiddleware, updateBook);

bookRouter.delete('/:id', rbac(['Admin']), authMiddleware,deleteBook);

export default bookRouter;
