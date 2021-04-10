let express = require('express')
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

var out;

router.post('/', async function(req, res){
	
	out = "";

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
 
	const user = req.body.username;
	const pwd = req.body.password;
	const given = req.body.givenname;
	const last = req.body.lastname;
	const age = req.body.age;
	const gender = req.body.gender;

	out += 'Received: Username......    ' + user + '<br>';
	out += 'Received: Given name....... ' + given + '<br>';
	out += 'Received: Last name........ ' + last + '<br>';
	out += 'Received: age.............. ' + age + '<br>';
	out += 'Received: gender........... ' + gender + '<br>';

	//console.log(out);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

		await createListing(client,
        {
			username: user,
			password: pwd,
            givenname: given,
            lastname: last,
            age: age,
            gender: gender
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);

});


async function createListing(client, newListing){
    const result = await client.db("tripspaceDB").collection("drivers").insertOne(newListing);
    out += `New listing created with the following id: ${result.insertedId}`;
};

//export this router to use in our index.js
module.exports = router;
