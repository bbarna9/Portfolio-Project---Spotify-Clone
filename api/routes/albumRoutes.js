import express from 'express';
import Album from '../models/Album.js';

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
    ]);
    res.send(albums);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALBUM BY ID

router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.parans.id);
    if (album) {
      res.send(album);
    } else {
      res.status(404).send({ message: 'Album not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALBUMS BY AUTHOR

router.get('author/:authorKey', async (req, res) => {
  try {
    const albums = await Album.find({
      authorKey: req.parans.authorKey,
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

router.post('/', async (req, res) => {
  const newAlbum = new Album(req.body);
  try {
    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
