const BookingModel = require('../Models/booking');
const TripModel = require('../Models/trip');
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
                const username = req.params.username;
                console.log("username is: " + username);
                var userBookings = '';
                var userBooking = '';
                var out = '';
                var array = [];
                
                try {
                    userBookings = await BookingModel.find( { userID: username }, { __v:0 } );
                    
                    //console.log(results);
                    
                    //res.send(userBookings);
                    console.log("userBookings length is: " + userBookings.length);

                    for (var i = 0; i < userBookings.length; i++) {
                        userBooking = userBookings[i];
                        console.log("tripID is: " + userBooking.tripID);
                        const tripLinkedtoThisBooking = await TripModel.findOne( { _id: userBooking.tripID }, { __v:0 } );                        
                        const allBookingsForThisTrip = await BookingModel.find( { tripID: userBooking.tripID }, { __v:0 } );
                        
                        var otherBookingsForThisTrip = [];

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

                        array.push({ userBooking, tripLinkedtoThisBooking, otherBookingsForThisTrip, bookingStats });
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
                
            }
            
    

};