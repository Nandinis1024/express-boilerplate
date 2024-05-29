const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./User');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test_db';
const app = express();
app.use(express.json());
app.use(cors());

// const createUser = async (req, res) => {
//   const user = new User({
//     name: 'John Doe',
//     email: 'johncena@vv.com',
//     password: 'password123',
//   });

//   await user.save();
// };


app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});


app.post('/api/data', (req, res) => {
  const receivedData = req.body;
  res.status(201).json({ message: 'Data received successfully', data: receivedData });
});


async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to database');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    // createUser();

  } catch (error) {
    console.error('Error connecting to database: ', error);
    process.exit(1); 
  }
}

startServer();