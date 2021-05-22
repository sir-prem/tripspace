const {MongoClient, ObjectID} = require('mongodb');
//const { search } = require('./user-profile');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";


async function addHeaderHTML(out) {
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
    return out;
}

async function addFooterHTML(out) {

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
        out += '        © 2021 Copyright TripSPACE';
        out += '        <a class="grey-text text-lighten-4 right" href="#!">More Links</a>';
        out += '    </div>';
        out += '  </div>';
        out += '</footer>';

out+= '    </body>';
out+= '</html>';
return out;
}

//retrieves trip document, given a trip ID
async function retrieveTripDoc(client, tripID) { 
    tripDoc = await client.db("tripspaceDBTest").collection("trips").findOne({ _id: ObjectID(tripID)});
    console.log(tripDoc);
    return tripDoc;    
};

//retrieves user document, given their username
async function retrieveUserDoc(username) { 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    userDoc = await client.db("tripspaceDBTest").collection("users").findOne({ username: username });
    console.log("retrieved the UserDoc for: " + username);
    console.log(userDoc);
    return userDoc;
};

async function backToProfilePageButton(out,username) {

    out += `<div class="col s12 l5 grey lighten-5 z-depth-1">
                <p>
                <form method="POST" action="/user-profile">
                    <input type="hidden" name="username" value=${username} />
                    <input type="hidden" name="sourcepage" value="back"/>
                    <button class="btn waves-effect waves-light" type="submit">Back To Profile</button>
                    </form>
                    </p>
                    </div>`;
                    return out;
                };

async function displayUserType(out,username) {

    const userDoc = await retrieveUserDoc(username);

    const userType = userDoc.usertype;

    out += `<div class="col s12 l5 grey lighten-5 z-depth-1">
                <h5>My role is: <b>${userType}</b></h5>
            </div>`;
                    return out;
                };
                
    //                <input type="hidden" name="usertype" value="user"/>
module.exports = {
    addHeaderHTML,
    addFooterHTML,
    retrieveTripDoc,
    retrieveUserDoc,
    backToProfilePageButton,
    displayUserType
};