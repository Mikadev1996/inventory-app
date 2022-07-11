const async = require('async');
const Thp = require('../models/thp');
const Vape = require('../models/vape');
const { body, validationResult } = require('express-validator');

exports.index = (req, res, next) => {
    async.parallel({
        thp_count: callback => {
            Thp.countDocuments({}, callback);
        },
        vape_count: callback => {
            Vape.countDocuments({}, callback);
        }
    }, (err, results) => {
        res.render('index', {
            title: 'BAT Portfolio',
            err: err,
            data: results,
        })
    })
}

exports.thp_list = (req, res, next) => {
    Thp.find({})
        .sort({release_date: 1})
        .exec((err, list_thp) => {
            if (err) return(next(err));
            res.render('thp_list', {
                title: "Tobacco Heating Products",
                thp_list: list_thp,
            })
        })
}

exports.thp_detail = (req, res, next) => {
    Thp.findById(req.params.id)
        .exec((err, results) => {
            if (err) return (next(err));
            res.render('thp_detail', {
                data: results
            })
        })
}

exports.thp_create_get = (req, res, next) => {
    res.render('thp_create', {title: "Add your Device"})
}

exports.thp_create_post = [
    body('name', 'Name must not be empty.').trim().isLength({min: 1}).escape(),
    body('release_date', 'Release Date must not be empty.').trim().isLength({min: 1}).escape(),
    body('number_in_stock', 'Number of Devices must not be empty.').trim().isLength({min: 1}).escape(),
    body('consumable', 'Consumable Type must not be empty.').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errrr');
            return;
        }

        let thp = new Thp({
            name: req.body.name,
            release_date: req.body.release_date,
            number_in_stock: req.body.number_in_stock,
            consumable: req.body.consumable
        })

        thp.save((err) => {
            if (err) return next(err);
            res.redirect('/category/thp');
        })
    }
]


exports.thp_delete_get = (req, res, next) => {
    res.render('thp_delete', {
        title: "Delete THP",
        thp_id: req.params.id
    })
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