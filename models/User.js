var Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

var UserSchema = new Schema({
     name:{ type: String, default: null }
});

module.exports = Mongoose.model('User', UserSchema);