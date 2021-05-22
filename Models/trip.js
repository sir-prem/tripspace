const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    username: String,
    fromSuburb: String,
    toSuburb: String,
    date: Date,
    departureTime: Date,
    arrivalTime: Date,
    vehicle: String,
    cargoSpace: Number,
    seatSpace: Number
});

const Trip = mongoose.model('trip', TripSchema);
module.exports = Trip;