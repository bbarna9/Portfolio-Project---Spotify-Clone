import express from 'express';
import Song from '../models/Song.js';

const router = express.Router();

// GET ALL SONGS

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.send(songs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE SONG

router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (song) {
      res.send(song);
    } else {
      res.status(404).send({ message: 'Song not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SONGS BY AUTHOR

router.get('/author/:authorKey', async (req, res) => {
  try {
    const songs = await Song.find({
      authorKey: req.params.authorKey,
    });
    if (songs) {
      res.send(songs);
    } else {
      res.status(404).send({ message: 'Author not found/has no songs.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD SONG

router.post('/', async (req, res) => {
  const newSong = new Song(req.body);
  try {
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
