import mongoose from 'mongoose';

const AlbumScheme = new mongoose.Schema({
  key: { type: String, required: true },
  title: { type: String, required: true },
  length: { type: String, required: true },
  authorKey: { type: String, required: true },
  themeColor: { type: String, required: true },
  copyright: { type: String, required: true },
  releaseyear: { type: String, required: true },
  genre: { type: String, required: true },
  coverImg: { type: String, required: true },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: false,
    },
  ],
});

const Album = mongoose.model('Album', AlbumScheme);
export default Album;
