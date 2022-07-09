const express = require('express');
const router = express.Router();

const thpController = require('../controllers/thpController');
const vapeController = require('../controllers/vapeController');

router.get('/thp', thpController.thp_list);

router.get('/vapes', vapeController.vape_list);

router.get('/')

module.exports = router;