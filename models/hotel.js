var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    insert_id: { type: String },
    name: { type: String, required: [true, 'The hotel name is mandatory'] },
    stars: { type: Number },
    price: { type: Number },
    image: { type: String }

});

module.exports = mongoose.model('Hotel', hotelSchema);