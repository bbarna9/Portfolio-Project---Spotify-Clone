import express from 'express';
import Author from '../models/Author.js';
import { isAdmin, verify } from '../utils.js';

const router = express.Router();

// GET ALL AUTHORS

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET A SINGLE AUTHOR

router.get('/:id', verify, async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.send(author);
  } else {
    res.status(404).send({ message: 'Author not found.' });
  }
});

// ADD AN AUTHOR

router.post('/', verify, isAdmin, async (req, res) => {
  const newAuthor = new Author(req.body);
  try {
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (err) {
    res.status(500).json(err);
  }
});
