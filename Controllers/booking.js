const BookingModel = require('../Models/booking');
const TripModel = require('../Models/trip');
const UserModel = require('../Models/user');
let Util = require('./utilities');
let BookingView = require('../Views/booking');

async function getBookingsByUser(username) {
    Util.consoleLogHeader('Get Bookings By User');
    var userBookings = '';
    var userBooking = '';
    var array = [];
    
    try {
        userBookings = await BookingModel.find( { userID: username }, { __v:0 } );
        
        console.log("userBookings length is: " + userBookings.length);

        for (var i = 0; i < userBookings.length; i++) {
            userBooking = userBookings[i];
            console.log("tripID is: " + userBooking.tripID);
            const tripLinkedtoThisBooking = await TripModel.findOne( { _id: userBooking.tripID }, { __v:0 } );

            const allBookingsForThisTrip = await BookingModel.find( { tripID: userBooking.tripID }, { __v:0 } );

            const tripTotalSeatSpace = tripLinkedtoThisBooking.seatSpace;
            const tripTotalCargoSpace = tripLinkedtoThisBooking.cargoSpace;
            
            const mySeats = userBooking.seatSpace;
            const myCargo = userBooking.cargoSpace;
            var totalBookedSeats = 0;
            var totalBookedCargo = 0;
            var remainingSeats;
            var remainingCargo;                        

            // get the total amount of booked seats and booked cargo for this trip
            for (var j = 0; j < allBookingsForThisTrip.length; j++) {                                                        
                var thisBooking = allBookingsForThisTrip[j];                            
                totalBookedSeats += thisBooking.seatSpace;
                totalBookedCargo += thisBooking.cargoSpace;
            }

            remainingSeats = tripTotalSeatSpace - totalBookedSeats;
            remainingCargo = tripTotalCargoSpace - totalBookedCargo;
            
            const mySpace = { myCargo, mySeats };
            
            if (remainingCargo == 0) {
                remainingCargo = "FULL";
            }
            if (remainingSeats == 0) {
                remainingSeats = "FULL";
            }

            const remainingSpace = { remainingCargo, remainingSeats };
            
            const viewBookingDetailsURL = `/user/booking-details/${userBooking._id}`;

            var userBookingWithNames = await Util.addNameToBooking(userBooking);
            var dateJSON = await Util.getDateJSON(tripLinkedtoThisBooking.date);
            array.push({ userBookingWithNames, tripLinkedtoThisBooking, dateJSON, mySpace, remainingSpace, viewBookingDetailsURL });
        }

        for (var i = 0; i < array.length; i++) {
            console.log(array[i]);                        
        }
        //res.send(array);
        //res.send(userBookings);
        
    } catch (error) {
        console.log(error.message);        
    }
    return array;
}

module.exports = {

    addNewBooking:
            async (req,res,next) => {

                try {
                    const newBooking = new BookingModel(req.body);
                    const booking = await newBooking.save();       
                    const user = await UserModel.findOne( { username: booking.userID }, { __v:0 } );
                    const trip = await TripModel.findOne( { _id: booking.tripID }, { __v:0 } );
                    const dateJSON = await Util.getDateJSON(trip.date);
                    const dateString = dateJSON.dateString;
                    
                    var out = await BookingView.bookingConfirmation(booking, user, trip, dateString);
                    res.send(out);
                } catch (error) {
                    console.log(error.message);
                }
            
            },
    getAllBookings: 
            async (req, res, next) => {
                try {
                    const results = await BookingModel.find( {}, { __v:0 } );
                    res.send(results);
                } catch (error) {
                    console.log(error.message);
                }            
            },
    getBookingByID:
            async (req, res, next) => {
                const id = req.params.id;
                console.log("id is: " + id);
                var result = '';
                try {
                    if (id.match(/^[0-9a-fA-F]{24}$/)) {
                        result = await BookingModel.findOne( { _id: id }, { __v:0 } );
                    }
                    console.log(result);
                    res.send(result);
                    //await UserView.displayUserProfilePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
            },
    getBookingsByUserParams:
            async (req, res, next) => {

                const username = req.params.username;
                console.log("username is: " + username);
                Util.consoleLogHeader('Get Bookings By User Params');
                
                var array = await getBookingsByUser(username);
                var out = await BookingView.displayBookingsByUserPage(array);
                res.send(out);
                
            },
    getBookingsByUser,
    editBookingDetails:
            async (req, res, next) => {
                console.log(req.body);
                var userBooking;
                try {
                    userBooking = await BookingModel.findOne( { tripID: req.body.tripID, userID: req.body.userID }, { __v:0, _id:0 } );                    
                    await BookingView.editBookingDetails(res, userBooking);

                } catch (error) {
                    console.log(error.message);
                }
                
            },
    bookingDetails:
            async (req, res, next) => {

                const bookingID = req.params.bookingID;
                
                Util.consoleLogHeader('Viewing User Booking Details');

                console.log("bookingID is: " + bookingID);
                                
                var userBooking = '';
                var driverInfo = '';
                var outputJSON;
                
                try {

                    userBooking = await BookingModel.findOne( { _id: bookingID }, { __v:0, _id:0 } );                    
                    //console.log(userBooking);

                    const tripLinkedtoThisBooking = await TripModel.findOne( { _id: userBooking.tripID }, { __v:0 } ); 
                    //console.log(tripLinkedtoThisBooking);

                    driverInfo = await UserModel.findOne( { username: tripLinkedtoThisBooking.username }, { __v:0, _id:0, password:0, usertype:0 } );
                    //console.log(driverInfo);

                    const allBookingsForThisTrip = await BookingModel.find( { tripID: userBooking.tripID }, { __v:0 } );
                    
                    var otherBookingsForThisTrip = [];
                    var username = userBooking.userID;

                    const tripTotalSeatSpace = tripLinkedtoThisBooking.seatSpace;
                    const tripTotalCargoSpace = tripLinkedtoThisBooking.cargoSpace;
                    var otherUsersSeatsTotal = 0;
                    var otherUsersCargoTotal = 0;
                    const mySeats = userBooking.seatSpace;
                    const myCargo = userBooking.cargoSpace;
                    var totalBookedSeats;
                    var totalBookedCargo;
                    var remainingSeats;
                    var remainingCargo;
                    var percentageUtilizedSeatSpace;
                    var percentageUtilizedCargoSpace;

                    // extract all other users' bookings, leaving out this user
                    for (var j = 0; j < allBookingsForThisTrip.length; j++) {                                                        
                        var thisBooking = allBookingsForThisTrip[j];
                        if (thisBooking.userID != username) {
                            otherBookingsForThisTrip.push(thisBooking);
                            otherUsersSeatsTotal += thisBooking.seatSpace;
                            otherUsersCargoTotal += thisBooking.cargoSpace;
                        }
                    }

                    totalBookedSeats = mySeats + otherUsersSeatsTotal;
                    totalBookedCargo = myCargo + otherUsersCargoTotal;
                    remainingSeats = tripTotalSeatSpace - totalBookedSeats;
                    remainingCargo = tripTotalCargoSpace - totalBookedCargo;
                    percentageUtilizedSeatSpace = Math.round((totalBookedSeats/tripTotalSeatSpace)*100);
                    percentageUtilizedCargoSpace = Math.round((totalBookedCargo/tripTotalCargoSpace)*100);

                    var bookingStats = {
                            tripTotalSeatSpace: tripTotalSeatSpace,
                            tripTotalCargoSpace: tripTotalCargoSpace,
                            mySeats: mySeats,
                            myCargo: myCargo,
                            otherUsersSeatsTotal: otherUsersSeatsTotal,
                            otherUsersCargoTotal: otherUsersCargoTotal,
                            remainingSeats: remainingSeats,
                            remainingCargo: remainingCargo,
                            percentageUtilizedSeatSpace: percentageUtilizedSeatSpace,
                            percentageUtilizedCargoSpace: percentageUtilizedCargoSpace
                    };
                    var dateJSON = await Util.getDateJSON(tripLinkedtoThisBooking.date);
                    outputJSON = { userBooking, tripLinkedtoThisBooking, dateJSON, driverInfo, otherBookingsForThisTrip, bookingStats };
                    
                    console.log(outputJSON);
                    await BookingView.bookingDetails(res, outputJSON);

                } catch (error) {
                    console.log(error.message);
                }
                
            }
            
    

};