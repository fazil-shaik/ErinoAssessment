// File: server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import contactRoutes from './routes/contacts.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api/contacts', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});