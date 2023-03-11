const express = require('express');

const router = express.Router();

const systemController = require('../controllers/system');

router.get('/', systemController.indexPage);

router.get('/see-countries', systemController.seeCountriesPage);

router.get('/country-details/:countryId', systemController.countryDetailsPage);

module.exports = router;
