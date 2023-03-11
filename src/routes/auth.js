const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

// router.get('/signup', authController.signupPage);

// router.post('/signup', authController.signup);

router.get('/login', authController.loginPage);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
