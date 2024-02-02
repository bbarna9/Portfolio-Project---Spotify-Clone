const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  listeners: { type: Number, required: true },
  desc: { type: String, required: true },
  profileImg: { type: String, required: true },
  descImg: { type: String, required: true },
  coverImg: { type: String, required: true },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
  ],
});

module.exports = mongoose.model('Author', AuthorSchema);
