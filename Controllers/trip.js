const TripModel = require('../Models/trip');
const BookingModel = require('../Models/booking');
let TripView = require('../Views/trip');

module.exports = {

    addNewTrip:
            async (req,res,next) => {

                try {
                    const newTrip = new TripModel(req.body);
                    const result = await newTrip.save();        
                    res.send(result);
                    //await TripView.displayTripAddedPage(res, result);
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
    getTripsByDriver:
            async (req, res, next) => {
                const driverUsername = req.params.username;
                console.log("driverUsername is: " + driverUsername);
                var driverTrips = '';
                var driverTrip = ''; 
                var array = [];               
                
                try {
                    driverTrips = await TripModel.find( { username: driverUsername }, { __v:0 } );                    

                    for (var i = 0; i < driverTrips.length; i++) {
                        driverTrip = driverTrips[i];
                        console.log("driverTrip._id is: " + driverTrip._id);
                        const bookingsForThisTrip = await BookingModel.find( { tripID: driverTrip._id }, { __v:0 } );

                        const tripTotalSeatSpace = driverTrip.seatSpace;
                        const tripTotalCargoSpace = driverTrip.cargoSpace;
                        var totalBookedSeats = 0;
                        var totalBookedCargo = 0;
                        var remainingSeats;
                        var remainingCargo;
                        var percentageUtilizedSeatSpace;
                        var percentageUtilizedCargoSpace;

                        var driverTripStatus;
                        var numberOfBookingsForThisTrip = bookingsForThisTrip.length;

                        //console.log("num bookings for this trip is: " + bookingsForThisTrip.length); 

                        for (var j = 0; j < numberOfBookingsForThisTrip; j++) {
                            var thisBooking = bookingsForThisTrip[j];
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
                        
                        
                        if (numberOfBookingsForThisTrip > 0) {
                            driverTripStatus = {
                                status: "BOOKED BY " + numberOfBookingsForThisTrip + " USERS",
                                colour: "red"
                            };
                        }
                        else {
                            driverTripStatus = {
                                status: "AVAILABLE",
                                colour: "green"
                            };

                        }
                        array.push({ driverTrip, bookingsForThisTrip, driverTripStatus, bookingStats });
                    }
                    
                    for (var i = 0; i < array.length; i++) {
                        console.log(array[i]);
                    }
                    res.send(array);

                    //await UserView.displayUserProfilePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
                
            },
        findTripsBySuburb:
            async (req, res, next) => {
                console.log(req.query);
                const fromSub = req.query.fromSub;
                const toSub = req.query.toSub;
                console.log("fromSub is: " + fromSub);
                console.log("toSub is: " + toSub);
                var results = '';
                
                try {
                    results = await TripModel.find( 
                                                    {"$and": 
                                                        [ 
                                                            {fromSuburb: fromSub}, 
                                                            {toSuburb: toSub} 
                                                        ]  
                                                    }, 
                                                    { __v:0 } 
                                                );                    
                    console.log(results);
                    res.send(results);
                    //await UserView.displayUserProfilePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
                
                
            }
            
    

};