import express from 'express';
import Album from '../models/Album.js';
import { isAdmin, verify } from '../utils.js';

const router = express.Router();

// GET ALL ALBUMS

/* router.get('/', async (req, res) => {
  try {
    const albums = await Album.find();
    res.send(albums);
  } catch (err) {
    res.status(500).json(err);
  }
}); */

router.get('/', async (req, res) => {
  try {
    const albums = await Album.aggregate([
      {
        $lookup: {
          from: 'songs', // collection name in db
          localField: 'key',
          foreignField: 'albumKey',
          as: 'songs',
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
    res.send(albums);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALBUM BY ID

router.get('/:id', verify, async (req, res) => {
  try {
    const album = await Album.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.id }] } } },
      {
        $lookup: {
          from: 'songs', // collection name in db
          localField: 'key',
          foreignField: 'albumKey',
          as: 'songs',
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
    if (album) {
      res.send(album[0]);
    } else {
      res.status(404).send({ message: 'Album not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALBUMS BY KEY

router.get('/key/:key', verify, async (req, res) => {
  try {
    const album = await Album.aggregate([
      { $match: { key: req.params.key } },
      {
        $lookup: {
          from: 'songs', // collection name in db
          localField: 'key',
          foreignField: 'albumKey',
          as: 'songs',
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
    if (album) {
      res.send(album[0]);
    } else {
      res.status(404).send({ message: 'Album not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALBUMS BY AUTHOR

router.get('author/:authorKey', verify, async (req, res) => {
  try {
    const albums = await Album.find({
      authorKey: req.params.authorKey,
    });
    if (albums) {
      res.send(albums);
    } else {
      res.status(404).send({ message: 'Author not found/has no albums.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD ALBUM

router.post('/', verify, isAdmin, async (req, res) => {
  const newAlbum = new Album(req.body);
  try {
    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
