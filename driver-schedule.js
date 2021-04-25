let express = require('express')
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

let U = require("./utilities.js");

var out;
var user = "";
var addTrip; // flag to add new trip to database

router.post('/', async function(req, res){
	
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    out = "";
    user = req.body.username;

    userDoc = await U.retrieveUserDoc(user);
    userType = userDoc.usertype;
    console.log("back: userType is: " + userType);

    addTrip = req.body.addNew;

    console.log("username value is: " + user);
    console.log("addTrip value is: " + addTrip);
        
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        //firstly, if a new trip was just submitted (in prev route call), update database
        if (addTrip == "true") {
            console.log("a form was submitted with a new trip..");
            await addNewTripToDB(client, {
                username: user,
                fromSuburb: req.body.fromSuburb,
                toSuburb: req.body.toSuburb,
                date: req.body.tripDate,
                start: req.body.startTime,
                end: req.body.endTime,
                vehicle: req.body.vehicleType,
                cargoSpace: req.body.cargoSpace,
                seats: req.body.seats,
                });
            console.log("new trip added to database (trips collection)..");
            addTrip = false;
        }
        
        out = await U.addHeaderHTML(out);
        
        out += '	<div class="container">';
        out += '		<div class="row">';
        
                            //content

                            await showTripSchedule(client);

        out += `        </div>`;

        out += `        <div class="row">`;
        
                            await showNewTripForm();

        out += '            <div class="col s12 l1"></div>'; //empty div for spacing between columns


                        out = await U.backToProfilePageButton(out,user);
        
        out += `        </div>`;
    
        
        out+= '     </div>'; // end container div

        out = await U.addFooterHTML(out);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);
    

});

async function addNewTripToDB(client, newTrip) {
    const result = await client.db("tripspaceDB").collection("driverTrips").insertOne(newTrip);
    console.log(`New trip added to DB with id: ${result.insertedId}`);
}


async function showTripSchedule(client) {
    
    out += '    <div class="col s12 l12 grey lighten-5 z-depth-1">';
    out += '	    <h5>Driver trip schedule for <b>' + user + ' :</b></h5>';
    
    const cursor = client.db("tripspaceDB").collection("driverTrips").find({ username: user });
    const results = await cursor.toArray(); 
    
        if (results.length > 0) {
    
            out += '<br> Found ' + results.length + ' listing(s) for user <b>' + user + '</b><br>';
        
            out += '<table>';
            out += '    <tr>';
            out += '        <th>Date</th>';
            out += '        <th>From</th>';
            out += '        <th>Til</th>';
            out += '        <th>Start</th>';
            out += '        <th>Destination</th>';
            out += '        <th>Vehicle</th>';
            out += '        <th>Cargo Space</th>';
            out += '        <th>Seats Available</th>';
            out += '    </tr>';

            results.forEach((result, i) => {

                out += "<tr>";
                out += `    <td> ${result.date} </td>`;
                out += `    <td> ${result.start} </td>`;
                out += `    <td> ${result.end} </td>`;
                out += `    <td> ${result.fromSuburb} </td>`;
                out += `    <td> ${result.toSuburb} </td>`;
                out += `    <td> ${result.vehicle} </td>`;
                out += `    <td> ${result.cargoSpace} </td>`;
                out += `    <td> ${result.seats} </td>`;

                if (result.bookedBy != null) {
                    out += `<td style="color:red">BOOKED</td>`;
                }
                else {
                    out += `<td style="color:limegreen">AVAILABLE</td>`;
                }

                out += "</tr>";
            });

            out += '</table>';
    
        } else {
            out += `No listings found for user ${user}`;
        }

    out += '    </div>';
    
};

async function showNewTripForm() {
    out += '    <div class="col s12 l4 grey lighten-5 z-depth-1">';
    out += '	    <h5>Add new trip</h5>';
    out += '	    <form method="POST" action="/driver-schedule" id="addtrip">';

    out += '            From (suburb): <input type="text" name="fromSuburb" /><br>';
    out += '            To (suburb): <input type="text" name="toSuburb" /><br>';
    out += '            Date: <input type="date" id="tripDate" name="tripDate"><br>';
    out += '            Start Time: <input type="time" id="startTime" name="startTime"><br>';
    out += '            End Time: <input type="time" id="endTime" name="endTime"><br>';
    out += '            Vehicle type: <input type="text" id="vehicleType" name="vehicleType"><br>';
    out += '            Cargo space available: <input type="text" name="cargoSpace" /><br>';
    out += '            Seats available: <input type="text" name="seats" /><br>';

    out += '            <input type="hidden" name="username" value=' + user + '>';
    out += '            <input type="hidden" name="addNew" value="true" >';
    out += '	        <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>';

    out += '	    </form>';
    out += '    </div>';
}

//export this router to use in our index.js
module.exports = router;
