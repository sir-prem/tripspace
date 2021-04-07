let express = require("express");
let app = express();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";
let http = require('http').createServer(app);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

var test = require('./test.js');

//both index.js and things.js should be in same directory
app.use('/test', test);

//app.get("/test", async function(request, response) {

	//var user_name = request.query.user_name;
/* 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client, request, response);
*/
		/*
		await createListing(client,
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        });
		*/
/*
		//await findOneListingByName(client, /Paris/);
		//await findByName(client, /Paris/);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
*/
//});

http.listen(port,()=>{
	console.log("Listening on port ", port);
});

/*
async function listDatabases(client, request, response){
    databasesList = await client.db().admin().listDatabases();

	var out = "Databases:<br>";
    databasesList.databases.forEach(db => out+= (` - ${db.name}<br>`));
	response.send(out);
};
*/
