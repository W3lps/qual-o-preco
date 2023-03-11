const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-car', adminController.addCarPage);

router.get('/add-country', adminController.addCountryPage);

module.exports = router;
