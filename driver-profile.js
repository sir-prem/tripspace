let express = require('express')
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

var out;
var user = "";
var pwd = "";
var given = "";
var last  = "";
var age = 0;
var gender = "";
var isExistingUsername;
var fromLogin = "no";
var isVerified;

router.post('/', async function(req, res){
	
	out = "";
	isExistingUsername = false;
    isVerified = 0;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
 
    fromLogin = req.body.login;

    //console.log("fromLogin value is: " + fromLogin);
    user = req.body.username;
    pwd = req.body.password;

    if(fromLogin=="no") {
        given = req.body.givenname;
        last = req.body.lastname;
        age = req.body.age;
        gender = req.body.gender;
    }
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        await addHeaderHTML();
        
        out += '	<div class="container">';
        out += '		<div class="row">';
        
        if(fromLogin=="no") {  // from registration form
		    await checkExistingUser(client, user);
            if (isExistingUsername) {
                await usernameExists();            
            }
            else { // new driver registration
                await createDriver(client,
                    {
                    username: user,
                    password: pwd,
                    givenname: given,
                    lastname: last,
                    age: age,
                    gender: gender
                    });
                await newRegistrant(); 
            }
        }     
        else  { // (fromLogin=="yes") --> from login form
                
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
                    await verifiedUserLogin();
                }                
        }

        out+= '            </div>';
        out+= '        </div>';

        await addFooterHTML();

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);
    

});

async function checkExistingUser(client, newUsername) {
	const cursor = client.db("tripspaceDB").collection("drivers").find({ username: newUsername });
	const results = await cursor.toArray(); 
	if (results.length > 0) {
        isExistingUsername = true;
	}
};

async function createDriver(client, newListing){
    const result = await client.db("tripspaceDB").collection("drivers").insertOne(newListing);
    //out += `New listing created with the following id: ${result.insertedId}`;
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
    const result = await client.db("tripspaceDB").collection("drivers").findOne({ username: user });

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

async function usernameExists() {
    out += '<div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	<br> Sorry <b>' + given + '</b>, the username <b>' + user + '</b> already exists. Please choose another one.';
    out += '	<br><br><a href="./new-driver.html" class="waves-effect waves-light btn light-green darken-1">Back to registration</a><br><br>';
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

async function verifiedUserLogin() {

    //change column span size of cards through these variables
    const welcomeBackCard_colSpan_small = 12;
    const welcomeBackCard_colSpan_large = 6;

    const profileInfoCard_colSpan_small = 12;
    const profileInfoCard_colSpan_large = 6;

    const viewTripsBtnCard_colSpan_small = 12;
    const viewTripsBtnCard_colSpan_large = 6;

    out += `<div class="row">`;
        await welcomeBackCard(welcomeBackCard_colSpan_small, welcomeBackCard_colSpan_large);
    out += `</div>`;

    out += `<div class="row">`;
        await profileInfoCard(profileInfoCard_colSpan_small, profileInfoCard_colSpan_large);
    out += `</div>`;

    out += `<div class="row">`;
        await viewTripsButtonCard(viewTripsBtnCard_colSpan_small, viewTripsBtnCard_colSpan_large);
    out += `</div>`;
}

async function newRegistrant() {

    const profileInfoCard_colSpan_small = 12;
    const profileInfoCard_colSpan_large = 6;

    out += '<div class="col s12 l6 grey lighten-5 z-depth-1">';
    out += '	<h4>Thanks for registering, <b>' + given + '</b></h4>';
    await profileInfoCard(profileInfoCard_colSpan_small, profileInfoCard_colSpan_large);
    out += '</div>';
}

async function welcomeBackCard(sColSpan, lColSpan) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<h4>Welcome back, <b>' + given + '</b></h4>';
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

async function profileInfoCard(sColSpan, lColSpan) {
	//out += '<div class="row">';
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<div class="col s12 l6 grey lighten-5">';
    out +=		   '<table>';
    out +=				'<tr><td>Username</td><td>' + user + '</td></tr>';
    out +=				'<tr><td>Given name</td><td>' + given + '</td></tr>';
    out +=				'<tr><td>Last name</td><td>' + last + '</td></tr>';
    out +=				'<tr><td>age</td><td>' + age + '</td></tr>';
    out +=				'<tr><td>gender</td><td>' + gender + '</td></tr>';
    out +=		   '</table>';
	out += '	</div>';
    out += '	<div class="col s4 l4 grey lighten-5">';

	if (gender=="Male") {
		out +=		   '<img src="avatar_M.jpeg" width=100% />';
	}
	else {
		out +=		   '<img src="avatar_F.jpeg" width=100% />';
	}

	out +=	   '</div>';
	out += '</div>';
}


//export this router to use in our index.js
module.exports = router;
