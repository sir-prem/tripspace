const TripModel = require('../Models/trip');
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
                var results = '';
                
                try {
                    results = await TripModel.find( { username: driverUsername }, { __v:0 } );                    
                    console.log(results);
                    res.send(results);
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