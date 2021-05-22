let express = require('express')
var router = express.Router();

const {MongoClient} = require('mongodb');
const { search } = require('./user-profile');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

let U = require("./utilities.js");

var out;
var user = "";
var searchSubmitted; // flag to add new trip to database

router.post('/', async function(req, res){
	
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    out = "";
    user = req.body.username;
    searchSubmitted = req.body.searchSubmitted;
    //userDoc = await U.retrieveUserDoc(user);

    console.log("username value is: " + user);
    console.log("searchSubmitted value is: " + searchSubmitted);
        
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        
        
        await addHeaderHTML();
        
        out += '	<div class="container">';

        out += '		<div class="row">';
        
                        //content
                        
                        await showTripFinderForm();
                        

                        //firstly, if a new trip was just submitted (in prev route call), update database
                        if (searchSubmitted == "true") {
                            console.log("a search was submitted..");
                            
                            
                            
                            await displayTripsFound(client, {
                                username: user,
                                fromSuburb: req.body.fromSuburb,
                                toSuburb: req.body.toSuburb,
                                date: req.body.tripDate,
                                cargoSpace: req.body.cargoSpace,
                                seats: req.body.seats,
                                });
                            //console.log("new trip added to database (trips collection)..");
                            
                            //addTrip = false;
                        }
    
        out+= '         </div>';

        out += '		<div class="row">';

                        out = await U.backToProfilePageButton(out,user);

        out+= '         </div>';

        out+= '     </div>';

        await addFooterHTML();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);
});

async function displayTripsFound(client, searchParamObj) {
    //out += '    <div class="col s12 l1></div>'; // empty div column as spacer
    out += '    <div class="col s12 l8 grey lighten-5 z-depth-1">';
    out += `	    <h5>Search Results</h5>`;
    
    const cursor = client.db("tripspaceDBTest").collection("trips").find
                                        ({ 
                                            $and: [
                                                { fromSuburb: searchParamObj.fromSuburb },
                                                { toSuburb: searchParamObj.toSuburb }
                                            ] 
                                        });

    const results = await cursor.toArray(); 
    
        if (results.length > 0) {
    
            out += `<br> Found ${results.length} trip(s) going 
                                from <b>${searchParamObj.fromSuburb}</b>
                                to <b>${searchParamObj.toSuburb}</b>                                
                                <br>`;
        
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
                out += `    <td>`;
                out += '	    <form method="POST" action="/view-trip" id="viewtripbtn">';
                out += '            <input type="hidden" name="username" value=' + user + '>';
                out += `            <input type="hidden" name="tripID" value=${result._id} >`;
                out += '	        <button class="btn waves-effect waves-light" type="submit">View Trip Details</button>';

                out += '	    </form>';
                out+= `</td>`;

                out += "</tr>";
            });

            out += '</table>';            
    
        } else {
            out += `<b>0</b> trips found going
                                    from <b>${searchParamObj.fromSuburb}</b>
                                    to <b>${searchParamObj.toSuburb}</b>
                                    <br>`;
        }

        
    out += '    </div>';
};

async function showTripFinderForm() {

    out += '    <div class="col s12 l3 grey lighten-5 z-depth-1">';

    out += '	    <h5>Trip Finder: Find a trip</h5>';

    out += '	    <form method="POST" action="/trip-finder" id="tripfinderform">';

    out += '            From (suburb): <input type="text" name="fromSuburb" /><br>';
    out += '            To (suburb): <input type="text" name="toSuburb" /><br>';
    out += '            Travelling/couriering on (date): <input type="date" id="tripDate" name="tripDate"><br>';
    out += '            Cargo space required (cubic meters): <input type="text" name="cargoSpace" /><br>';
    out += '            Seats required: <input type="text" name="seats" /><br>';

    out += '            <input type="hidden" name="username" value=' + user + '>';
    out += '            <input type="hidden" name="searchSubmitted" value="true" >';
    out += '	        <button class="btn waves-effect waves-light" type="submit" name="action">Find Trip</button>';

    out += '	    </form>';
    out += '    </div>';

}

async function addHeaderHTML() {
    out += '<html>';
	out += '<head>';
    out += '<!-- Compiled and minified CSS -->';
    out += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
    out += '<link rel="stylesheet" href="./style.css">';

    out += '<!-- Compiled and minified JavaScript -->';
    out += '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';
            
	out += '</head>';
	out += '<body>';

	out += '	  <nav>';
	out += '		<div class="nav-wrapper brown lighten-4">';
	out += '		  <a href="#" class="brand-logo"><img src="logo.png" width="160px"/></a>';
	out += '		  <ul id="nav-mobile" class="right hide-on-med-and-down">';
	out += '			<li><a href="./index.html">Home</a></li>';
	out += '			<li><a href="./about.html">About</a></li>';
	out += '			<li><a href="./contact.html">Contact</a></li>';
	out += '		  </ul>';
	out += '		</div>';
	out += '	  </nav>';
}

async function addFooterHTML() {

        out += '<footer class="page-footer brown darken-4 grey-text text-lighten-5">';
        out += '  <div class="container">';
        out += '    <div class="row">';
        out += '      <div class="col l6 s12">';
        out += '        <h5 class="white-text">Footer Content</h5>';
        out += '        <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>';
        out += '      </div>';
        out += '      <div class="col l4 offset-l2 s12">';
        out += '        <h5 class="white-text">Links</h5>';
        out += '        <ul>';
        out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>';
        out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>';
        out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>';
        out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>';
        out += '        </ul>';
        out += '      </div>';
        out += '    </div>';
        out += '  </div>';
        out += '  <div class="footer-copyright brown darken-3 grey-text text-lighten-5">';
        out += '    <div class="container">';
        out += '    © 2021 Copyright TripSPACE';
        out += '    <a class="grey-text text-lighten-4 right" href="#!">More Links</a>';
        out += '    </div>';
        out += '  </div>';
        out += '</footer>';

out+= '    </body>';
out+= '</html>';
}

//export this router to use in our index.js
module.exports = router;
