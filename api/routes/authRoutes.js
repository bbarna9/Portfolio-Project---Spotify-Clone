import express from 'express';
import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// REGISTER A NEW USER

router.post('/register', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    profilePic: req.body.username || '',
    isAdmin: req.body.isAdmin,
  });

  try {
    if (req.body.confirmPassword === req.body.password) {
      const user = await newUser.save();
      const { password, ...info } = user._doc;
      res.status(201).json(info);
    } else {
      res.status(401).json("Passwords don't match!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword === req.body.password) {
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY
        //{ expiresIn: '5d' }
      );
      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    } else {
      res.status(401).json('Wrong password!');
    }
  } else {
    res.status(401).json('Wrong email address!');
  }
});

export default router;
