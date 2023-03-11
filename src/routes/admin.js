const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-country', adminController.addCountryPage);

router.get('/add-car', adminController.addCarPage);

router.post('/add-country', adminController.addCountry);

router.post('/delete-country/:countryId', adminController.deleteCountry);

router.post('/add-car', adminController.addCar);

router.post('/delete-car/:carId', adminController.deleteCar);

module.exports = router;
