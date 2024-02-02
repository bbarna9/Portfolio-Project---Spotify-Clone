import mongoose from 'mongoose';

const AlbumScheme = new mongoose.Schema({
  key: { type: String, required: true },
  title: { type: String, required: true },
  authorKey: { type: String, required: true },
  coverImg: { type: String, required: true },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
});

const Album = mongoose.model('Album', AlbumScheme);
export default Album;
