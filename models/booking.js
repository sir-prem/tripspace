const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema ({
    tripID: String,
    userID: String,
    cargoSpace: Number,
    seatSpace: Number,
    comments: String
});

const Booking = mongoose.model('booking', bookingSchema);
module.exports = Booking;