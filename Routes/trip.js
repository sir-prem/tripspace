const express = require("express");
const router = express.Router();
const TripController = require('../Controllers/trip');

router.get('/', TripController.getAllTrips);

router.post('/', TripController.addNewTrip);

router.get('/driver/trip-details/:tripID', TripController.viewDriverTripDetails);

router.get('/driver/:username', TripController.getTripsByDriver);

router.get('/search', TripController.findTripsBySuburb);

router.get('/:id', TripController.getTripByID);

router.patch("/", (req, res, next) => {
    res.send("UPDATE (patch): book trip");
});

module.exports = router;