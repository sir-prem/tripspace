let express = require("express");
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

var out;

router.get('/', async function(req, res){

	out = "";
	 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client, req, res);

		await findByName(client, /Neil/);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

	out += '<form method="POST" action="/new-listing">' +
  				'username: <input type="text" name="username" /><br>' +
				'password: <input type="text" name="password" /><br>' +
  				'Given name: <input type="text" name="givenname" /><br>' +
  				'Last name: <input type="text" name="lastname" /><br>' +
  				'Age: <input type="text" name="age" /><br>' +
				'Gender: <input type="text" name="gender" /><br>' +
				'<input type="submit" />' +
			'</form>';

	res.send(out);
});

async function listDatabases(client, request, response){
    databasesList = await client.db().admin().listDatabases();

	out += "Databases:<br>";
    databasesList.databases.forEach(db => out+= (` - ${db.name}<br>`));
};


async function findByName(client, nameOfListing) {

	const cursor = client.db("tripspaceDB").collection("drivers").find({ givenname: nameOfListing });

	const results = await cursor.toArray(); 

	if (results.length > 0) {

	out += '<br> Found listing(s) with name ' + nameOfListing;

        results.forEach((result, i) => {

            out += "<br>";
            out += `${i + 1}. username: ${result.username} <br>`;
            out += `   _id: ${result._id} <br>`;
            out += `   given name: ${result.givenname} <br>`;
            out += `   last name: ${result.lastname} <br>`;
        });

    } else {
        out += `No listings found with name ${nameOfListing}`;
    }

};

//export this router to use in our index.js
module.exports = router;
