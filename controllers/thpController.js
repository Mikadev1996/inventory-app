const async = require('async');
const Thp = require('../models/thp');
const Vape = require('../models/vape');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
    res.render('index', { title: 'Express' });
}

exports.thp_list = (req, res, next) => {
    res.send('Not Implemented yet');
}

exports.thp_detail = (req, res, next) => {
    res.send('Not Implemented yet');
}

exports.thp_create_get = (req, res, next) => {
    res.send('Not Implemented yet');
}

exports.thp_create_post = (req, res, next) => {
    res.send('Not Implemented yet');
}

exports.thp_delete_get = (req, res, next) => {
    res.send('Not Implemented yet');
}

exports.thp_delete_post = (req, res, next) => {
    res.send('Not Implemented yet');
}

exports.thp_update_get = (req, res, next) => {
    res.send('Not Implemented yet');
}

exports.thp_update_post = (req, res, next) => {
    res.send('Not Implemented yet');
}