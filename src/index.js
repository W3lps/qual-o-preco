const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionStorage = require('connect-mongodb-session')(session);
const multer = require('multer');
require('dotenv').config();

const USER = process.env.USER;
const PASS = process.env.PASS;
const DB = process.env.DB;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

const MONGODB_URI = `mongodb+srv://${USER}:${PASS}@cars-project.bsygvrz.mongodb.net/${DB}`;

const app = express();

const storage = new sessionStorage({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const systemRoutes = require('./routes/system');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src/images', express.static(path.join(__dirname, '/images')));

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: storage,
  })
);

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/', systemRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));
