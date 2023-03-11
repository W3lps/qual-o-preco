const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const USER = process.env.USER;
const PASS = process.env.PASS;
const DB = process.env.DB;
const PORT = process.env.PORT;

const app = express();

const MONGODB_URI = `mongodb+srv://${USER}:${PASS}@carproject.doi7uso.mongodb.net/${DB}?retryWrites=true&w=majority`;

const systemRoutes = require('./routes/system');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/', systemRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));
