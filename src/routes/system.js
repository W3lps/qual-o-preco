const express = require('express');

const router = express.Router();

const systemController = require('../controllers/system');

router.get('/', systemController.indexPage);

module.exports = router;
