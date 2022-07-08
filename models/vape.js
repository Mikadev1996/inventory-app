const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VapeSchema = new Schema({
    name: {type: String, required: true},
    release_date: {type: Number, required: true},
    number_in_stock: {type: Number, required: true},
    category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
})

VapeSchema
    .virtual('url')
    .get(function() {
        return '/category/vapes/' + this._id;
    });

module.exports = mongoose.model('Vape', VapeSchema);