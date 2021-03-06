const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/booking');

router.get("/", BookingController.getAllBookings);

router.post("/", BookingController.addNewBooking);
router.post('/edit', BookingController.edit);
router.post('/cancel', BookingController.cancel);
router.post('/back', BookingController.back);

router.get('/user/booking-details/:bookingID', BookingController.bookingDetails);
router.post('/editBooking-details', BookingController.editBookingDetails);

router.get('/user/:username', BookingController.getBookingsByUserParams);

router.get('/:id', BookingController.getBookingByID);

router.patch("/", (req, res, next) => {
    res.send("UPDATE (patch): book trip");
});

module.exports = router;