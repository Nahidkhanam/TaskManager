
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task'); 
const userRoutes = require('./routes/user');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/me', userRoutes);

app.use((req, res) => {
  console.log(`404 attempted on: ${req.method} ${req.url}`);
  res.status(404).send("Route not found on Server");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on 5000'));