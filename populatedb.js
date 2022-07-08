#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async')
const Category = require('./models/category');
const Thp = require('./models/thp');
const Vape = require('./models/vape');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let categories = [];
let thps = [];
let vapes = [];

function categoryCreate(name, description, callback) {
    const category = new Category({name: name, description: description});

    category.save(err => {
        if (err) {
            callback(null, category);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        callback(null, category)
    });
}

function thpCreate(name, release_date, number_in_stock, consumable, category, callback) {
    const thpDetail = {
        name: name,
        release_date: release_date,
        number_in_stock: number_in_stock,
        consumable: consumable,
        category: category,
    }

    const thp = new Thp(thpDetail);

    thp.save(err => {
        if (err) {
            callback(null, thp);
            return;
        }
        console.log('New Thp: ' + thp);
        thps.push(thp);
        callback(null, thp)
    })
}

function vapeCreate(name, release_date, number_in_stock, category, callback) {
    const vapeDetail = {
        name: name,
        release_date: release_date,
        number_in_stock: number_in_stock,
        category: category,
    }

    const vape = new Vape(vapeDetail);

    vape.save(err => {
        if (err) {
            callback(null, vape);
            return;
        }
        console.log('New Vape: ' + vape);
        vapes.push(vape);
        callback(null, vape)
    })
}

function createCategory(callback) {
    async.series([
        function (callback) {
            categoryCreate('Thps', 'THP Description', callback);
        },
        function (callback) {
            categoryCreate('Vapes', 'Vape Description', callback);
        },
    ],
        callback)
}

function createThps(callback) {
    async.series([
        function (callback) {
            thpCreate("Glo (Express)", 2017, 10, "Superslim", categories[0], callback);
        },
        function (callback) {
            thpCreate("Glo nano (Lantern)", 2019, 5, "Superslim", categories[0], callback);
        },
        function (callback) {
            thpCreate("Glo Hyper (Spirit)", 2020, 100, "Demislim", categories[0], callback);
        },
    ],
        callback)
}

function createVapes(callback) {
    async.series([
            function (callback) {
                vapeCreate("ePod", 2016, 25, categories[1], callback);
            },
            function (callback) {
                vapeCreate("ePod 2", 2019, 1000, categories[1], callback);
            },
        ],
            callback)
}


async.series([
        createCategory,
        createThps,
        createVapes
    ],
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('Thps: ' + thps);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });



