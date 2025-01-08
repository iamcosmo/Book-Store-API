import express from 'express';
import cache from '../middleware/cache.js';
import rbac from '../middleware/rbac.js';
import Book from '../models/Book.js';


let books = [];

router.post('/', rbac(['Admin']), (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json({ message: 'Book created', book });
});

router.get('/', cache, (req, res) => {
  res.json(books);
});

router.put('/:id', rbac(['Admin']), (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  books = books.map(book => (book.id === id ? updatedBook : book));
  res.json({ message: 'Book updated', updatedBook });
});

router.delete('/:id', rbac(['Admin']), (req, res) => {
  const { id } = req.params;
  books = books.filter(book => book.id !== id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
