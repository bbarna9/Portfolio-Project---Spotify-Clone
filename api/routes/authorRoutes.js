const router = require('express').Router();
const Author = require('../models/Author');

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

router.get('/:id', async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.send(author);
  } else {
    res.status(404).send({ message: 'Author not found.' });
  }
});

// ADD AN AUTHOR

router.post('/', async (req, res) => {
  const newAuthor = new Author(req.body);
  try {
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (err) {
    res.status(500).json(err);
  }
});
