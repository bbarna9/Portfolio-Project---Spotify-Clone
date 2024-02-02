import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    albumKey: { type: String },
    author: { type: String, required: true },
    authorKey: { type: String, required: true },
    coverImg: { type: String, required: true },
    listens: { type: String, required: true },
    length: { type: String, required: true },
    link: { type: String, required: true },
    genre: { type: String, required: true },
  },
  { timestamps: true }
);

const Song = mongoose.model('Song', SongSchema);
export default Song;
