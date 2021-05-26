const BookingModel = require('../Models/booking');
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
    getTripsBookedByUser:
            async (req, res, next) => {
                const username = req.params.username;
                console.log("username is: " + username);
                var results = '';
                
                try {
                    results = await BookingModel.find( { username: username }, { __v:0 } );                    
                    console.log(results);
                    res.send(results);
                    //await UserView.displayUserProfilePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
                
            }
            
    

};