const BookingModel = require('../Models/booking');
const TripModel = require('../Models/trip');
const UserModel = require('../Models/user');
let Util = require('./utilities');
let BookingView = require('../Views/booking');

module.exports = {

    addNewBooking:
            async (req,res,next) => {

                try {
                    const newBooking = new BookingModel(req.body);
                    const result = await newBooking.save();        
                    res.send(result);
                    //await TripView.displayTripAddedPage(res, result);
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
    getBookingsByUser:
            async (req, res, next) => {

                Util.consoleLogHeader('Get Bookings By User');
                const username = req.params.username;
                console.log("username is: " + username);
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

                        array.push({ userBooking, tripLinkedtoThisBooking, mySpace, remainingSpace, viewBookingDetailsURL });
                    }

                    for (var i = 0; i < array.length; i++) {
                        console.log(array[i]);                        
                    }
                    res.send(array);
                    //res.send(userBookings);
                    //await UserView.displayUserProfilePage(res, userBooking);
                } catch (error) {
                    console.log(error.message);
                }
                
            },
    viewUserBookingDetails:
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
                    
                    outputJSON = { userBooking, tripLinkedtoThisBooking, driverInfo, otherBookingsForThisTrip, bookingStats };
                    
                    console.log(outputJSON);
                    res.send(outputJSON);

                    //res.send(userBookings);
                    //await UserView.displayUserProfilePage(res, userBooking);

                } catch (error) {
                    console.log(error.message);
                }
                
            }
            
    

};