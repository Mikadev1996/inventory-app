const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThpSchema = new Schema({
        name: {type: String, required: true},
        release_date: {type: Number, required: true},
        number_in_stock: {type: Number, required: true},
        consumable: {type: String, required: true},
        category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    }
)

ThpSchema
    .virtual('url')
    .get(function() {
        return '/category/thp/' + this._id;
    });

module.exports = mongoose.model('Thp', ThpSchema);