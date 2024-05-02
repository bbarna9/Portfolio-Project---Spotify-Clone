import express from 'express';
import CryptoJS from 'crypto-js';
import User from '../models/User.js';
import { verify, isAdmin } from '../utils.js';

const router = express.Router();

// GET ALL USERS

router.get('/', verify, isAdmin, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// GET SINGLE USER BY ID

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FAVOURITE SONGS

router.get('/:id/favourites', async (req, res) => {
  try {
    const favourites = await User.aggregate([
      { $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.id }] } } },
      {
        $lookup: {
          from: 'songs', // collection name in db
          localField: 'likedSongs',
          foreignField: '_id',
          as: 'songs',
        },
      },
      {
        $lookup: {
          from: 'albums', // collection name in db
          localField: 'likedAlbums',
          foreignField: '_id',
          as: 'albums',
        },
      },
      {
        $lookup: {
          from: 'authors', // collection name in db
          localField: 'likedAuthors',
          foreignField: '_id',
          as: 'authors',
        },
      },
    ]);
    res.status(200).json(favourites);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// UPDATE USER

router.put('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (req.body.songId) {
    try {
      if (!user.likedSongs.includes(req.body.songId)) {
        const updatedUser = await User.updateOne(
          { _id: req.params.id },
          { $push: { likedSongs: req.body.songId } }
        );
        res.status(200).json(updatedUser);
      } else {
        const updatedUser = await User.updateOne(
          { _id: req.params.id },
          { $pull: { likedSongs: req.body.songId } }
        );
        res.status(200).json(updatedUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (req.body.albumId) {
    try {
      if (!user.likedAlbums.includes(req.body.albumId)) {
        const updatedUser = await User.updateOne(
          { _id: req.params.id },
          { $push: { likedAlbums: req.body.albumId } }
        );
        res.status(200).json(updatedUser);
      } else {
        const updatedUser = await User.updateOne(
          { _id: req.params.id },
          { $pull: { likedAlbums: req.body.albumId } }
        );
        res.status(200).json(updatedUser);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else if (req.body.authorId) {
    try {
      if (!user.likedAuthors.includes(req.body.authorId)) {
        const updatedUser = await User.updateOne(
          { _id: req.params.id },
          { $push: { likedAuthors: req.body.authorId } }
        );
        res.status(200).json(updatedUser);
      } else {
        const updatedUser = await User.updateOne(
          { _id: req.params.id },
          { $pull: { likedAuthors: req.body.authorId } }
        );
        res.status(200).json(updatedUser);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// DELETE USER

export default router;
