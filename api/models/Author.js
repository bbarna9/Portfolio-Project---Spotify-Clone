import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  listeners: { type: String, required: true },
  desc: { type: String, required: true },
  profileImg: { type: String, required: true },
  descImg: { type: String, required: true },
  coverImg: { type: String, required: true },
  genre: { type: String, required: true },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: false,
    },
  ],
  merch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merch',
      required: false,
    },
  ],
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: false,
    },
  ],
});

const Author = mongoose.model('Author', AuthorSchema);
export default Author;
