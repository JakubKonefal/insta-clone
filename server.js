const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());
dotenv.config();

const authRoute = require('./routes/auth');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', authRoute);

app.listen(5000, () => {
  console.log('Server running on 5000');
});
