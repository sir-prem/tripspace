let express = require("express");
var router = express.Router();

const {MongoClient, ObjectID} = require('mongodb');
//const { search } = require('./user-profile');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

let U = require("./utilities.js");

var out;
var user = "";
var tripID; // flag to add new trip to database

router.post('/', async function(req, res){
	
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    out = "";
    user = req.body.username;
    tripID = req.body.tripID;
    console.log("username value is: " + user);
    console.log("tripID value is: " + tripID);

    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        out = await U.addHeaderHTML(out);

        
        await makeBooking(client);
            
        //    console.log("booking ID is: " + bookingID);
            
        //content
        out += '<div class="container">';


        out += `    <div class="row">`;

            await showBookingConfirmation();
        
        out += `    </div>`;

        out += `    <div class="row">`;

            out = await U.backToProfilePageButton(out,user);
        
        out += `    </div>`;

        out+= '</div>'; // end container div

        out = await U.addFooterHTML(out);

    }
    catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);
});

async function makeBooking(client){
    const result = await client.db("tripspaceDB").collection("driverTrips")
                .updateOne({_id : ObjectID(tripID) }, {$set: {bookedBy: user}}, {multi: true})
    console.log(`Updated driverTrip with bookedBy user ${user}`);
};

async function showBookingConfirmation() {
    out += `    <div class="col s12 l5 grey lighten-5 z-depth-1">
            	    <h5>Booking Confirmation</h5>
     
                    <p>Your booking is confirmed.</p>

                    <p>Your booking reference number is <b> ${tripID}</b>.</p>
                </div>`;
};

//export this router to use in our index.js
module.exports = router;