let express = require('express')
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

let U = require("./utilities.js");

var out;
var user = "";
var pwd = "";
var given = "";
var last  = "";
var age = 0;
var gender = "";
var isExistingUsername;
//var fromLogin = "no";
var isVerified;
var userType;
var userDoc;


router.post('/', async function(req, res){
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    
    try {

        // Connect to the MongoDB cluster
        await client.connect();
    
        fromSourcePage = req.body.sourcepage; // get (prev) source page - {"login", "register", "back" }
                                                    //used to display appropriate display data
        user = req.body.username; // get username from form hidden input
        
        userType = req.body.usertype;

        out = "";
        isExistingUsername = false;
        isVerified = 0;

        
        console.log("fromSource value is: " + fromSourcePage);
        console.log("usertype is: " + userType);
            
        pwd = req.body.password;
                 
        out = await U.addHeaderHTML(out);
        
        out += '	<div class="container">';
        out += '		<div class="row">';
        
        if(fromSourcePage=="register") {  // from registration form
            
            given = req.body.givenname;
            last = req.body.lastname;
            age = req.body.age;
            gender = req.body.gender;            

		    await checkExistingUser(client, user);
            if (isExistingUsername) {
                await usernameExists();            
            }
            else { // new driver registration
                await createUser(client,
                    {
                    username: user,
                    password: pwd,
                    givenname: given,
                    lastname: last,
                    age: age,
                    gender: gender,
                    usertype: userType
                    });

                userDoc = await U.retrieveUserDoc(user);
                await newRegistrant(); 
            }
        }
        
        else {
            userDoc = await U.retrieveUserDoc(user);
            
            if (fromSourcePage=="login") { // from login form
                    
                    await verifyID(client);

                    // cases based on isVerified flag
                    // 0 - username invalid
                    // 1 - username valid, pwd not match
                    // 2 - username valid, pwd match (verified user)

                    if (isVerified == 0) {
                        await wrongUsername();
                    }
                    else if (isVerified == 1) {
                        await wrongPassword();
                    }
                    else { // (isVerified == 2)                     
                        await verifiedUserLogin(client);
                    }                
            }
            else { // if (fromSourcePage=="back") : back to profile page from another page
                userType = userDoc.usertype;
                console.log("back: userType is: " + userType);
                await verifiedUserLogin(client);
            }
        }

        out+= '            </div>';
        out+= '        </div>';

        out = await U.addFooterHTML(out);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);
    

});

async function checkExistingUser(client, newUsername) {
	const cursor = client.db("tripspaceDBTest").collection("users").find({ username: newUsername });
	const results = await cursor.toArray(); 
	if (results.length > 0) {
        isExistingUsername = true;
	}
};

async function createUser(client, newUser){
    const result = await client.db("tripspaceDBTest").collection("users").insertOne(newUser);
    //out += `New user created with the following id: ${result.insertedId}`;
};

// verifyID() method checks user login credentials
// and updates isVerified flag to the following values:
//      0   -   username not found
//      1   -   username found, but password incorrect
//      2   -   username found, and password matches
//
//  also updates user global variables for case '2' (verified user)
//
async function verifyID(client) {
    const result = await client.db("tripspaceDBTest").collection("users").findOne({ username: user });

    console.log(result);

    if (result!=null) { //username exists in DB
        if (pwd == result.password) {
            console.log("wow, username match, and PWD match!");
            console.log("password is: " + result.password);
            isVerified = 2;
            await updateGlobalUserInfo(result);
        }
        else {
            console.log("username match, but PWD wrong");
            isVerified = 1;
        }
    }
    else {
        console.log("username not found, please register");
        isVerified = 0;
    }
}

// given a verified user document, update global user variables
async function updateGlobalUserInfo(doc) {
    user = doc.username;
    pwd = doc.password;
    given = doc.givenname;
    last = doc.lastname;
    age = doc.age;
    gender = doc.gender;
    userType = doc.usertype;
}

async function usernameExists() {
    out += '<div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	<br> Sorry <b>' + given + '</b>, the username <b>' + user + '</b> already exists. Please choose another one.';
    out += '	<br><br><a href="./new-user.html" class="waves-effect waves-light btn light-green darken-1">Back to registration</a><br><br>';
    out += '</div>';
}

async function wrongUsername() {
    out += '<div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	<br> Sorry, the username <b>' + user + '</b> does not exist. Please check that you have the correct username, or register as a new Driver.';
    out += '	<br><br><a href="./index.html" class="waves-effect waves-light btn light-green darken-1">Back to Sign-in page</a><br><br>';
    out += '</div>';
}

async function wrongPassword() {
	out += '<div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	<br> Sorry, the password for username: <b>' + user + '</b> is incorrect. Please try again.';
    out += '	<br><br><a href="./index.html" class="waves-effect waves-light btn light-green darken-1">Back to Sign-in page</a><br><br>';
    out += '</div>';
}

async function verifiedUserLogin(client) {

    console.log("do we get here?");
   
    if (userType == 'driver') {
        console.log("userType is: DRIVER");
        await displayDriverUI(client);
    }
    else {
        console.log("userType is: USER");
        await displayUserUI(client);
    }

}

async function displayDriverUI(client) {
    
    //change column span size of cards through these variables
    const welcomeBackCard_colSpan_small = 12;
    const welcomeBackCard_colSpan_large = 5;
    
    const profileInfoCard_colSpan_small = 12;
    const profileInfoCard_colSpan_large = 5;
    
    const viewTripsBtnCard_colSpan_small = 12;
    const viewTripsBtnCard_colSpan_large = 5;
    
    out += `<div class="row">`;
            console.log("before welcomebackcard");
                await welcomeBackCard(welcomeBackCard_colSpan_small, welcomeBackCard_colSpan_large);
            console.log("after welcomebackcard");
                out += '    <div class="col s12 l1"></div>'; //empty div
                out = await U.displayUserType(out,user);
    out += `</div>`;
    
    out += `<div class="row">`;
                await profileInfoCard(profileInfoCard_colSpan_small, profileInfoCard_colSpan_large);
                out += '    <div class="col s12 l1"></div>'; //empty div
                await thisDriversBookingsCard(client);
    out += `</div>`;
    
    out += `<div class="row">`;
                await viewTripsButtonCard(viewTripsBtnCard_colSpan_small, viewTripsBtnCard_colSpan_large);
    out += `</div>`;

    
}

async function displayUserUI(client) {

    //change column span size of cards through these variables
    const welcomeBackCard_colSpan_small = 12;
    const welcomeBackCard_colSpan_large = 5;

    const profileInfoCard_colSpan_small = 12;
    const profileInfoCard_colSpan_large = 5;

    const tripFinderButtonCard_colSpan_small = 12;
    const tripFinderButtonCard_colSpan_large = 5;

    out += `<div class="row">`;
                await welcomeBackCard(welcomeBackCard_colSpan_small, welcomeBackCard_colSpan_large);
                out += '    <div class="col s12 l1"></div>'; //empty div
                out = await U.displayUserType(out,user);
    out += `</div>`;

    out += `<div class="row">`;
                await profileInfoCard(profileInfoCard_colSpan_small, profileInfoCard_colSpan_large);
                out += '    <div class="col s12 l1"></div>'; //empty div
                await thisUsersBookingsCard(client);
    out += `</div>`;

    out += `<div class="row">`;
                await tripFinderButtonCard(tripFinderButtonCard_colSpan_small, tripFinderButtonCard_colSpan_large);
    out += `</div>`;

}

async function newRegistrant() {

    const profileInfoCard_colSpan_small = 12;
    const profileInfoCard_colSpan_large = 6;

    out += `<div class="row">`;
    out += '    <div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	    <h4>Thanks for registering, <b>' + given + '</b></h4>';
    out += `    </div>`;
    out += `</div>`;

    out += `<div class="row">`;
        await profileInfoCard(profileInfoCard_colSpan_small, profileInfoCard_colSpan_large);
    out += '</div>';
}

async function welcomeBackCard(sColSpan, lColSpan) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<h4>Welcome back, <b>' + userDoc.givenname + '</b></h4>';
    out += '</div>';
}

async function viewTripsButtonCard(sColSpan, lColSpan) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<p>View My Trips Schedule</p>';
    out += '	<form method="POST" action="/driver-schedule">';
    out += '	    <input type="hidden" name="username" value=' + user + '>';
    out += '	    <input type="hidden" name="addNew" value="false">';    
    out += '	    <button class="btn waves-effect waves-light" type="submit" name="action">My Trips</button>';
    out += '	</form>';
    out += '</div>';
}

async function tripFinderButtonCard(sColSpan, lColSpan) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<p>Start a trip search here</p>';
    out += '	<form method="POST" action="/trip-finder">';
    out += '	    <input type="hidden" name="username" value=' + user + '>';
    out += '	    <input type="hidden" name="searchSubmitted" value="false">';    
    out += '	    <button class="btn waves-effect waves-light" type="submit" name="action">Trip Finder</button>';
    out += '	</form>';
    out += '</div>';

}

async function profileInfoCard(sColSpan, lColSpan) {
	//out += '<div class="row">';
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<div class="col s12 l6 grey lighten-5">';
    out +=		   '<table>';
    out +=				'<tr><td><b>Username</b></td><td>' + user + '</td></tr>';
    out +=				'<tr><td><b>Given name</b></td><td>' + userDoc.givenname + '</td></tr>';
    out +=				'<tr><td><b>Last name</b></td><td>' + userDoc.lastname + '</td></tr>';
    out +=				'<tr><td><b>age</b></td><td>' + userDoc.age + '</td></tr>';
    out +=				'<tr><td><b>gender</b></td><td>' + userDoc.gender + '</td></tr>';
    out +=		   '</table>';
	out += '	</div>';
    out += '	<div class="col s4 l4 grey lighten-5">';

	if (userDoc.gender=="Male") {
		out +=		   '<img src="avatar_M.jpeg" width=100% />';
	}
	else {
		out +=		   '<img src="avatar_F.jpeg" width=100% />';
	}

	out +=	   '</div>';
	out += '</div>';
}

async function thisDriversBookingsCard(client) {

    //var booking = null;

    out += '    <div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	    <h5>My Bookings</h5>';

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
            out += '        <th>Booked By</th>';
            out += '    </tr>';
    
    await client.db("tripspaceDBTest").collection("trips").find({ username: user })
                    .forEach(
                        function(doc) {
                            if (doc.bookedBy != null) {
                                console.log("doc.bookedBy is: " + doc.bookedBy);
                                out += "<tr>";
                                out += `    <td> ${doc.date} </td>`;
                                out += `    <td> ${doc.start} </td>`;
                                out += `    <td> ${doc.end} </td>`;
                                out += `    <td> ${doc.fromSuburb} </td>`;
                                out += `    <td> ${doc.toSuburb} </td>`;
                                out += `    <td> ${doc.vehicle} </td>`;
                                out += `    <td> ${doc.cargoSpace} </td>`;
                                out += `    <td> ${doc.seats} </td>`;
                                out += `    <td> ${doc.bookedBy} </td>`;
                
                                out += "</tr>";
                            }
                        }
                    );

                    out += '</table>';




    out += '</div>';

}

async function thisUsersBookingsCard(client) {

    //var booking = null;

    out += '    <div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	    <h5>My Bookings</h5>';

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
            out += '        <th>Driver</th>';
            out += '    </tr>';
    
            console.log("reached here");
            const cursor = await client.db("tripspaceDBTest").collection("trips").find({ bookedBy: user });
            const results = await cursor.toArray();

            if (results.length > 0) {
                console.log("results are there");

                results.forEach((result, i) => {
                    if (result.bookedBy != null) {
                        console.log("result.bookedBy is: " + result.bookedBy);
                        out += "<tr>";
                        out += `    <td> ${result.date} </td>`;
                        out += `    <td> ${result.start} </td>`;
                        out += `    <td> ${result.end} </td>`;
                        out += `    <td> ${result.fromSuburb} </td>`;
                        out += `    <td> ${result.toSuburb} </td>`;
                        out += `    <td> ${result.vehicle} </td>`;
                        out += `    <td> ${result.cargoSpace} </td>`;
                        out += `    <td> ${result.seats} </td>`;
                        out += `    <td> ${result.username} </td>`;                
                        out += "</tr>";
                    }

                });
            }

                    out += '</table>';
    out += '</div>';

}


//export this router to use in our index.js
module.exports = router;
