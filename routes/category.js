const express = require('express');
const router = express.Router();

const thpController = require('../controllers/thpController');
const vapeController = require('../controllers/vapeController');

// Thp

router.get('/thp', thpController.thp_list);

router.get('/thp/create', thpController.thp_create_get);

router.get('/thp/create', thpController.thp_create_post);

router.get('/thp/:id/delete', thpController.thp_delete_get);

router.get('/thp/:id/delete', thpController.thp_delete_post);

router.get('/thp/:id/update', thpController.thp_update_get);

router.get('/thp/:id/update', thpController.thp_update_post);

// Vape

router.get('/vapes', vapeController.vape_list);

router.get('/vapes/create', vapeController.vape_create_get);

router.get('/vapes/create', vapeController.vape_create_post);

router.get('/vapes/:id/delete', vapeController.vape_delete_get);

router.get('/vapes/:id/delete', vapeController.vape_delete_post);

router.get('/vapes/:id/update', vapeController.vape_update_get);

router.get('/vapes/:id/update', vapeController.vape_update_post);

module.exports = router;