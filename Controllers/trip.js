const TripModel = require('../Models/trip');
const BookingModel = require('../Models/booking');
const UserModel = require('../Models/user');
let TripView = require('../Views/trip');
let Util = require('../Controllers/utilities');
const { userViewBookingStatsCard } = require('../Views/utilities');

async function getTripsByDriver(driverUsername) {
    Util.consoleLogHeader('Get Trips by Driver');

    var driverTrips = '';
    var driverTrip = ''; 
    var array = [];               
    
    try {
        driverTrips = await TripModel.find( { username: driverUsername }, { __v:0 } ); 
        for (var i = 0; i < driverTrips.length; i++) {
            driverTrip = driverTrips[i];
            console.log("driverTrip._id is: " + driverTrip._id);
            const bookingsForThisTrip = await BookingModel.find( { tripID: driverTrip._id }, { __v:0 } );
            
            var driverTripStatus;
            var numberOfBookingsForThisTrip = bookingsForThisTrip.length;
            
            if (numberOfBookingsForThisTrip > 0) {
                driverTripStatus = {
                    status: "BOOKED BY " + numberOfBookingsForThisTrip + " USERS",
                    colour: "IndianRed"
                };
            }
            else {
                driverTripStatus = {
                    status: "AVAILABLE",
                    colour: "YellowGreen"
                };
                
            }

            var dateJSON = await Util.getDateJSON(driverTrip.date);
            const viewTripDetailsURL = `/driver/trip-details/${driverTrip._id}`;                        
            array.push({ driverTrip, dateJSON, driverTripStatus, viewTripDetailsURL });
        }
        
        for (var i = 0; i < array.length; i++) {
            console.log(array[i]);
        }
        return array;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {

    addNewTrip:
            async (req,res,next) => {

                try {
                    const newTrip = new TripModel(req.body);
                    const driver = await UserModel.findOne( { username: req.body.username }, { __v:0 } );
                    const addedTrip = await newTrip.save();        
                    //res.send(result);
                    var out = await TripView.tripAdded(addedTrip,driver);
                    res.send(out);
                } catch (error) {
                    console.log(error.message);
                }
            
            },
    getAllTrips: 
            async (req, res, next) => {

                try {
                    const results = await TripModel.find( {}, { __v:0 } );
                    res.send(results);
                } catch (error) {
                    console.log(error.message);
                }            
            },
    getTripByID:
            async (req, res, next) => {

                Util.consoleLogHeader('Get Trip by ID');

                const id = req.params.id;
                console.log("id is: " + id);
                var result = '';
                try {
                    if (id.match(/^[0-9a-fA-F]{24}$/)) {
                        result = await TripModel.findOne( { _id: id }, { __v:0 } );
                    }
                    console.log(result);
                    res.send(result);
                    //await UserView.displayUserProfilePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
            },
    getTripsByDriverParams:
            async (req, res, next) => {

                const driverUsername = req.params.username;
                console.log("driverUsername is: " + driverUsername);
                var array = await getTripsByDriver(driverUsername);
                await TripView.displayTripsByDriverPage(res, array);
                
            },
    getTripsByDriver,
    driverViewTrip:
            async (req, res, next) => {

                Util.consoleLogHeader('Driver View Trip');

                const tripID = req.params.tripID;
                console.log("tripID is: " + tripID);

                
                var driverTrip = '';
                var json;
                
                try {
                    driverTrip = await TripModel.findOne( { _id: tripID }, { __v:0 } );

                    var bookingsForThisTrip = await BookingModel.find( { tripID: driverTrip._id }, { __v:0 } );

                    const tripTotalSeatSpace = driverTrip.seatSpace;
                    const tripTotalCargoSpace = driverTrip.cargoSpace;
                    var totalBookedSeats = 0;
                    var totalBookedCargo = 0;
                    var remainingSeats;
                    var remainingCargo;
                    var percentageUtilizedSeatSpace;
                    var percentageUtilizedCargoSpace;

                    var bookingsForTripWithNames = [];

                    const numberOfBookingsForThisTrip = bookingsForThisTrip.length;

                    for (var j = 0; j < numberOfBookingsForThisTrip; j++) {
                        var thisBooking = bookingsForThisTrip[j];
                        var thisBookingWithNames = await Util.addNameToBooking(thisBooking);
                        bookingsForTripWithNames.push(thisBookingWithNames);
                        totalBookedSeats += thisBooking.seatSpace;
                        totalBookedCargo += thisBooking.cargoSpace;
                    }
                    
                    remainingSeats = tripTotalSeatSpace - totalBookedSeats;
                    remainingCargo = tripTotalCargoSpace - totalBookedCargo;
                    if (tripTotalSeatSpace == 0) {
                        percentageUtilizedSeatSpace = "N/A";
                    }
                    else {
                        percentageUtilizedSeatSpace = Math.round((totalBookedSeats/tripTotalSeatSpace)*100);    
                    }

                    if (tripTotalCargoSpace == 0) {
                        percentageUtilizedCargoSpace = "N/A";
                    }
                    else {
                        percentageUtilizedCargoSpace = Math.round((totalBookedCargo/tripTotalCargoSpace)*100);
                    }

                    var bookingStats = {
                            tripTotalSeatSpace: tripTotalSeatSpace,
                            tripTotalCargoSpace: tripTotalCargoSpace,
                            totalBookedSeats: totalBookedSeats,
                            totalBookedCargo: totalBookedCargo,                                
                            remainingSeats: remainingSeats,
                            remainingCargo: remainingCargo,
                            percentageUtilizedSeatSpace: percentageUtilizedSeatSpace,
                            percentageUtilizedCargoSpace: percentageUtilizedCargoSpace
                    };
                                        
                    var dateJSON = await Util.getDateJSON(driverTrip.date);
                    json = { driverTrip, dateJSON, bookingsForTripWithNames, bookingStats };


                    console.log(json);
                    //res.send(json);

                    await TripView.tripDetails(res, json);

                } catch (error) {
                    console.log(error.message);
                }
                
                
            },
    userViewTrip:
            async (req, res, next) => {

                Util.consoleLogHeader('User View Trip');

                const tripID = req.params.tripID;
                console.log("tripID is: " + tripID);
                const username = req.params.username;
                console.log("username is: " + username);

                const toSub = req.query.toSub;
                const fromSub = req.query.fromSub;
                

                
                var driverTrip = '';
                var driver;
                var json;
                
                try {
                    driverTrip = await TripModel.findOne( { _id: tripID }, { __v:0 } );
                    driver = await UserModel.findOne( { username: driverTrip.username }, { __v:0 } );
                    var bookingsForThisTrip = await BookingModel.find( { tripID: driverTrip._id }, { __v:0 } );

                    const tripTotalSeatSpace = driverTrip.seatSpace;
                    const tripTotalCargoSpace = driverTrip.cargoSpace;
                    var totalBookedSeats = 0;
                    var totalBookedCargo = 0;
                    var remainingSeats;
                    var remainingCargo;
                    var percentageUtilizedSeatSpace;
                    var percentageUtilizedCargoSpace;

                    var bookingsForTripWithNames = [];

                    const numberOfBookingsForThisTrip = bookingsForThisTrip.length;
                    
                    for (var j = 0; j < numberOfBookingsForThisTrip; j++) {
                        var thisBooking = bookingsForThisTrip[j];
                        var thisBookingWithNames = await Util.addNameToBooking(thisBooking);
                        bookingsForTripWithNames.push(thisBookingWithNames);
                        totalBookedSeats += thisBooking.seatSpace;
                        totalBookedCargo += thisBooking.cargoSpace;
                    }
                    
                    remainingSeats = tripTotalSeatSpace - totalBookedSeats;
                    remainingCargo = tripTotalCargoSpace - totalBookedCargo;
                    
                    if (tripTotalSeatSpace == 0) {
                        percentageUtilizedSeatSpace = "N/A";
                    }
                    else {
                        percentageUtilizedSeatSpace = Math.round((totalBookedSeats/tripTotalSeatSpace)*100);    
                    }

                    if (tripTotalCargoSpace == 0) {
                        percentageUtilizedCargoSpace = "N/A";
                    }
                    else {
                        percentageUtilizedCargoSpace = Math.round((totalBookedCargo/tripTotalCargoSpace)*100);
                    }

                    var bookingStats = {
                            tripTotalSeatSpace: tripTotalSeatSpace,
                            tripTotalCargoSpace: tripTotalCargoSpace,
                            totalBookedSeats: totalBookedSeats,
                            totalBookedCargo: totalBookedCargo,                                
                            remainingSeats: remainingSeats,
                            remainingCargo: remainingCargo,
                            percentageUtilizedSeatSpace: percentageUtilizedSeatSpace,
                            percentageUtilizedCargoSpace: percentageUtilizedCargoSpace
                    };
                                        
                    var dateJSON = await Util.getDateJSON(driverTrip.date);
                    json = { tripID, username, driver, driverTrip, dateJSON, bookingsForTripWithNames, bookingStats, toSub, fromSub};
                    

                    console.log(json);
                    //res.send(json);

                    var out = await TripView.userTripDetails(json);
                    res.send(out);

                } catch (error) {
                    console.log(error.message);
                }                 
            },
    findTripsBySuburb:
        async (req, res, next) => {

            Util.consoleLogHeader("find Trips By Suburb");
            
            console.log(req.query);
            var username = req.query.username;
            var searchSubmitted;

            if (req.query.searched == undefined) {
                searchSubmitted = 'false';
            }
            else { //req.query.searched == 'true'
                searchSubmitted = 'true';
            }


            try {
                var out = ``;
                
                console.log(">> DISPLAYING TRIP FINDER FORM <<");
                
                // display page headers and trip finder form
                out = await TripView.tripFinder(username, searchSubmitted);
                
                console.log("searched is: " + searchSubmitted);
                
                // if user searched, include search results
                if (req.query.searched == `true`) {                    
                    
                    console.log(">> USER SEARCHED. Searching.. <<");
                    
                    const fromSub = req.query.fromSub;
                    const toSub = req.query.toSub;
                    console.log("fromSub is: " + fromSub);
                    console.log("toSub is: " + toSub);
    
                    var results = '';
        
                    results = await TripModel.find( 
                                                    {"$and": 
                                                        [ 
                                                            {fromSuburb: fromSub}, 
                                                            {toSuburb: toSub} 
                                                        ]  
                                                    }, 
                                                    { __v:0 } 
                                                );                    
                    
                    out = await TripView.tripFinderResults(username, results, out);
                }
                res.send(out);
            } catch (error) {
                console.log(error.message);
            }
        },
    addTripForm:
        async (req, res, next) => {
            Util.consoleLogHeader("Form: Add Trip");
            const driverUsername = req.params.username;

            console.log("driver is: " + driverUsername);

            try {
                var out = ``;
                out = await TripView.tripAdder(driverUsername);
                res.send(out);
            } catch (error) {
                console.log(error.message);
            }
        }
        

};