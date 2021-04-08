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

		await findByName(client, /Paris/);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

	out += '<form method="POST" action="/user-profile">' +
  				'Please enter user name: <input type="text" name="username" />' +
				'<input type="submit" />' +
			'</form><br>';

	out += '<form method="POST" action="/new-listing">' +
  				'Apartment name: <input type="text" name="apartName" /><br>' +
  				'Summary: <input type="text" name="summary" /><br>' +
  				'Bedrooms: <input type="text" name="bedrooms" /><br>' +
  				'Bathrooms: <input type="text" name="bathrooms" /><br>' +
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

	const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({ name: nameOfListing });

	const results = await cursor.toArray(); 

	if (results.length > 0) {

	out += '<br> Found listing(s) with name ' + nameOfListing;

        results.forEach((result, i) => {

            date = new Date(result.last_review).toDateString();
            out += "<br>";
            out += `${i + 1}. name: ${result.name} <br>`;
            out += `   _id: ${result._id} <br>`;
            out += `   bedrooms: ${result.bedrooms} <br>`;
            out += `   bathrooms: ${result.bathrooms} <br>`;
            out += `   most recent review date: ${new Date(result.last_review).toDateString()} <br>`;
        });

    } else {
        out += `No listings found with name ${nameOfListing}`;
    }

};

//export this router to use in our index.js
module.exports = router;
