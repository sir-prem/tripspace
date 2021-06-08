const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema ({
    tripID: String,
    userID: String,
    cargoSpace: Number,
    seatSpace: Number,
    comments: String
});

module.exports =
    mongoose.models.Booking || mongoose.model('Booking', bookingSchema);