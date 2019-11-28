var Mongoose = require('mongoose'),
   Schema = Mongoose.Schema;

var UserViewSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", default: null},
   productId: { type: Schema.Types.ObjectId, ref: "Product", default: null},
   viewDate: { type: Date, default: null },
});


module.exports = Mongoose.model('UserView', UserViewSchema);