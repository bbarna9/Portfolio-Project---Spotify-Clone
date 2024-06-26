import express from 'express';
import Song from '../models/Song.js';
import { isAdmin, verify } from '../utils.js';

const router = express.Router();

// GET ALL SONGS

router.get('/', async (req, res) => {
  try {
    const songs = await Song.aggregate([
      {
        $lookup: {
          from: 'albums',
          localField: 'albumKey',
          foreignField: 'key',
          as: 'albumKey',
        },
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'authorKey',
          foreignField: 'key',
          as: 'authorKey',
        },
      },
    ]);
    res.send(songs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE SONG

router.get('/:id', verify, async (req, res) => {
  try {
    const song = await Song.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.id }] } } },
      {
        $lookup: {
          from: 'albums',
          localField: 'albumKey',
          foreignField: 'key',
          as: 'albumKey',
        },
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'authorKey',
          foreignField: 'key',
          as: 'authorKey',
        },
      },
    ]);
    //const song = await Song.findById(req.params.id);
    if (song) {
      res.send(song[0]);
    } else {
      res.status(404).send({ message: 'Song not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SONGS BY AUTHOR

router.get('/author/:authorKey', verify, async (req, res) => {
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

router.post('/', verify, async (req, res) => {
  const newSong = new Song(req.body);
  try {
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
