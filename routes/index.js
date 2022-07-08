const express = require('express');
const router = express.Router();
const thpController = require('../controllers/thpController');
/* GET home page. */
router.get('/', thpController.index);

module.exports = router;
