const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/booking');

router.get("/", BookingController.getAllBookings);

router.post("/", BookingController.addNewBooking);

router.get('/user/booking-details/:bookingID', BookingController.bookingDetails);

router.get('/user/:username', BookingController.getBookingsByUserParams);

router.get('/:id', BookingController.getBookingByID);

router.patch("/", (req, res, next) => {
    res.send("UPDATE (patch): book trip");
});

module.exports = router;