const express = require("express");
const router = express.Router();
const TripController = require('../Controllers/trip');

router.get('/', TripController.getAllTrips);

router.post('/', TripController.addNewTrip);

router.get('/add/:username', TripController.addTripForm);

router.post('/editTrip', TripController.editTrip);

router.post('/edit', TripController.edit);
router.post('/cancel', TripController.cancel);
router.post('/back', TripController.back);

//Driver view of trip details (includes showing all user bookings)
router.get('/driver/trip-details/:tripID', TripController.driverViewTrip);

//User view of trip details (does not show all user bookings)
router.get('/user/trip-details/:tripID/:username', TripController.userViewTrip);

router.get('/driver/:username', TripController.getTripsByDriverParams);

router.get('/trip-finder', TripController.findTripsBySuburb);

router.get('/:id', TripController.getTripByID);

router.patch("/", (req, res, next) => {
    res.send("UPDATE (patch): book trip");
});

module.exports = router;