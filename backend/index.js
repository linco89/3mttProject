require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', movieRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(3001, () => console.log('Backend running on port 3001'));
});