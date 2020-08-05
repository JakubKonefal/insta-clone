const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const verifyToken = require('./middleware/verifyToken');

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', authRoute);
app.use('/', verifyToken, homeRoute);

app.listen(5000, () => {});
