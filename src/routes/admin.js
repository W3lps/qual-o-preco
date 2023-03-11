const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-car', adminController.addCarPage);

module.exports = router;
