import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: false, default: null },
    isAdmin: { type: Boolean, required: true },
    // isSubbed: {},
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: false,
        default: null,
      },
    ],
    likedAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: false,
        default: null,
      },
    ],
    likedAuthors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: false,
        default: null,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
