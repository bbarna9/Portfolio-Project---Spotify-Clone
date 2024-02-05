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

// REGISTER USER

// UPDATE USER

// DELETE USER

export default router;
