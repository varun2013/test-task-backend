var Mongoose = require('mongoose'),
     Schema = Mongoose.Schema;

var ProductSchema = new Schema({
     name: { type: String, default: null },

});

module.exports = Mongoose.model('Product', ProductSchema);