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
const Thp = require('./models/thp');
const Vape = require('./models/vape');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let thps = [];
let vapes = [];

function thpCreate(name, release_date, number_in_stock, consumable, img_ref, callback) {
    const thpDetail = {
        name: name,
        release_date: release_date,
        number_in_stock: number_in_stock,
        consumable: consumable,
        img_ref: img_ref
    }

    const thp = new Thp(thpDetail);
    thp.save(err => {
        if (err) {
            console.log(err);
            callback(null, thp);
            return;
        }
        console.log('New Thp: ' + thp);
        thps.push(thp);
        callback(null, thp)
    })
}

function vapeCreate(name, release_date, number_in_stock, callback) {
    const vapeDetail = {
        name: name,
        release_date: release_date,
        number_in_stock: number_in_stock,
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

function createThps(callback) {
    async.series([
        function (callback) {
            thpCreate("Glo (Express)", 2017, 10, "Superslim", "https://i.imgur.com/rFseTfb.png", callback);
        },
        function (callback) {
            thpCreate("Glo nano (Lantern)", 2019, 5, "Superslim", "https://i.imgur.com/sGGUTsG.png", callback);
        },
        function (callback) {
            thpCreate("Glo Hyper (Spirit)", 2020, 100, "Demislim",  "https://i.imgur.com/rUtV0P3.png", callback);
        },
    ],
        callback)
}

function createVapes(callback) {
    async.series([
            function (callback) {
                vapeCreate("ePod", 2016, 25, callback);
            },
            function (callback) {
                vapeCreate("ePod 2", 2019, 1000,  callback);
            },
        ],
            callback)
}


async.series([
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



