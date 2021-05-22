let express = require('express')
var router = express.Router();

const {MongoClient, ObjectID} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

let U = require("./utilities.js");

var out;
var user = "";
var tripID; // flag to add new trip to database
var tripDoc = "";

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
        
        tripDoc = await U.retrieveTripDoc(client, tripID);
        console.log("After retrieval, tripDoc._id is: " + tripDoc._id);
        
        out = await U.addHeaderHTML(out);
        
        //content
        out += '	<div class="container">';
        
        out += '		<div class="row">';
                            await showTripDetails();
        out+= '         </div>';
        
        out += '		<div class="row">';
                            await showBookTripButton();
        out+= '         </div>';

        out += '		<div class="row">';
                            out = await U.backToProfilePageButton(out,user);
        out+= '         </div>';
        
        out+= '     </div>'; // end container div

        out = await U.addFooterHTML(out);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);
});





async function showTripDetails() {
    out += '    <div class="col s12 l5 grey lighten-5 z-depth-1">';
    out += `	    <h5>Trip Details</h5>`;
     
            out += '<table>';          
            out += `        <tr><td><b>Date</b></td> <td> ${tripDoc.date} </td></tr>`;
            out += `        <tr><td><b>From</b></td> <td> ${tripDoc.fromSuburb} </td></tr>`;
            out += `        <tr><td><b>To</b></td> <td> ${tripDoc.toSuburb} </td></tr>`;
            out += `        <tr><td><b>Between</b></td> <td> ${tripDoc.start} </td></tr>`;
            out += `        <tr><td><b>And</b></td> <td> ${tripDoc.end} </td></tr>`;
            out += `        <tr><td><b>Vehicle Type</b></td> <td> ${tripDoc.vehicle} </td></tr>`;
            out += `        <tr><td><b>Cargo space available</b></td> <td> ${tripDoc.cargoSpace} </td></tr>`;
            out += `        <tr><td><b>Seats available</b></td> <td> ${tripDoc.seats} </td></tr>`;
            out += `        <tr><td><b>Driver</b></td> <td> ${tripDoc.username} </td></tr>`;
            out += '</table>';            
    out += '    </div>';
};

async function showBookTripButton() {
    out += '    <div class="col s12 l5 grey lighten-5 z-depth-1">';
    out += `	    <h5>Make Booking</h5>`;

    out += '	    <form method="POST" action="/book-trip" id="booktripbtn">';
    out += '            Seats required: <input type="text" name="seats" /><br>';
    out += '            Cargo space required (m3): <input type="text" name="cargo" /><br>';
    out += '            <input type="hidden" name="username" value=' + user + '>';
    out += `            <input type="hidden" name="tripID" value=${tripID} >`;
    out += '	        <button class="btn waves-effect waves-light" type="submit">Book Trip</button>';
    out += '	    </form>';

    out += '    </div>';
}


//export this router to use in our index.js
module.exports = router;
