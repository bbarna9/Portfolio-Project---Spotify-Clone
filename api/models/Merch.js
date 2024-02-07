import mongoose from 'mongoose';

const MerchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    authorKey: { type: String, required: true },
  },
  { timestamps: true }
);

const Merch = mongoose.model('Merch', MerchSchema);
export default Merch;
