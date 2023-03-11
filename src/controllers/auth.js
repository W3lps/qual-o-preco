const bcrypt = require('bcryptjs');

const User = require('../models/user');
const errorHandler = require('../helpers/errorHandler');

//the signup routes are not available on purpose
exports.signupPage = (req, res) => {
  res.render('auth/signup');
};

exports.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const hashedPass = await bcrypt.hash(password, 12);
  try {
    const user = new User({
      email: email,
      password: hashedPass,
    });
    await user.save();
    res.json({ message: 'Created user' });
  } catch (err) {
    console.log(err);
  }
};

exports.loginPage = (req, res, next) => {
  res.render('auth/login');
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.redirect('/login');

    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) return res.redirect('/login');

    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => console.log(err));
    res.redirect('/');
  } catch (err) {
    throw new Error(err);
  }
};

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
