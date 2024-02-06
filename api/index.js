import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import songRoutes from './routes/songRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import authorRoutes from './routes/authorRoutes';

const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.json());
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
// app.use('/api/authors', authorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to database'))
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
