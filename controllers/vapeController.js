const async = require('async');
const Vape = require('../models/vape');
const { body, validationResult } = require('express-validator');
const Thp = require("../models/thp");

exports.vape_list = (req, res, next) => {
    Vape.find({})
        .sort({release_date: 1})
        .exec((err, list_vapes) => {
            if (err) return(next(err));
            res.render('vape_list', {
                title: "Vapour Devices",
                vape_list: list_vapes,
            })
        })
}

exports.vape_detail = (req, res, next) => {
    Vape.findById(req.params.id)
        .exec((err, results) => {
            if (err) return (next(err));
            res.render('vape_detail', {
                data: results
            })
        })
}

exports.vape_create_get = (req, res, next) => {
    res.render('vape_create', {title: "Add your Device"})
}

exports.vape_create_post = [
    body('name', 'Name must not be empty.').trim().isLength({min: 1}).escape(),
    body('release_date', 'Release Date must not be empty.').trim().isLength({min: 1}).escape(),
    body('number_in_stock', 'Number of Devices must not be empty.').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errrr');
            return;
        }

        let vape = new Vape({
            name: req.body.name,
            release_date: req.body.release_date,
            number_in_stock: req.body.number_in_stock,
        })

        vape.save((err) => {
            if (err) return next(err);
            res.redirect('/category/vapes');
        })
    }
]

exports.vape_delete_get = (req, res, next) => {
    res.render('vape_delete', {
        title: "Delete Vape",
        vape_id: req.params.id
    })
}

exports.vape_delete_post = (req, res, next) => {
    Vape.findByIdAndRemove(req.body.delete_vape, function deleteVape(err) {
        if (err) return (next(err));
        res.redirect('/category/vapes');
    });
}

exports.vape_update_get = (req, res, next) => {
    Vape.findById(req.params.id)
        .exec((err, results) => {
            if (err) return next(err);
            res.render('vape_update', {
                data: results
            })
        })
}

exports.vape_update_post = [
    body('name', 'Name must not be empty.').trim().isLength({min: 1}).escape(),
    body('release_date', 'Release Date must not be empty.').trim().isLength({min: 1}).escape(),
    body('number_in_stock', 'Number of Devices must not be empty.').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errrr');
            return;
        }

        let vape = new Vape({
            name: req.body.name,
            release_date: req.body.release_date,
            number_in_stock: req.body.number_in_stock,
            _id: req.params.id
        })

        Vape.findByIdAndUpdate(req.params.id, vape, {}, function (err,theVape) {
            if (err) { return next(err); }
            // Successful - redirect to book detail page.
            res.redirect(theVape.url);
        });
    }
]