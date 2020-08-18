const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const verifyToken = require('./middleware/verifyToken');

const upload = multer();
const app = express();

app.use(cors());
app.use(express.json({}));
app.use(upload.any());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();

const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');
const profileRoute = require('./routes/profile');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/', authRoute);
app.use('/', verifyToken, homeRoute);
app.use('/', verifyToken, profileRoute);

app.listen(5000, () => {});
