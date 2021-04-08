let express = require('express')
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

var out;

router.post('/', async function(req, res){
	
	out = "";

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
 
	const apartName = req.body.apartName;
	const summary = req.body.summary;
	const bedrooms = req.body.bedrooms;
	const bathrooms = req.body.bathrooms;

	out += 'Received: Apartment name... ' + apartName + '<br>';
	out += 'Received: summary.......... ' + summary + '<br>';
	out += 'Received: bedrooms......... ' + bedrooms + '<br>';
	out += 'Received: bathrooms........ ' + bathrooms + '<br>';

	console.log(out);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

		await createListing(client,
        {
            name: apartName,
            summary: summary,
            bedrooms: bedrooms,
            bathrooms: bathrooms
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);

});


async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    out += `New listing created with the following id: ${result.insertedId}`;
};

//export this router to use in our index.js
module.exports = router;
