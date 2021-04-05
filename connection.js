const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";
 

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
		/*
		await createListing(client,
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        });
		*/

		await findOneListingByName(client, /Paris/);
		await findByName(client, /Paris/);

   

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
};

async function findOneListingByName(client, nameOfListing) {

    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });
    
	if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result.name);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
};

async function findByName(client, nameOfListing) {

	const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({ name: nameOfListing });

	const results = await cursor.toArray(); 

	if (results.length > 0) {

        console.log(`Found listing(s) with name ${nameOfListing}`);

        results.forEach((result, i) => {

            date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
        });

    } else {
        console.log(`No listings found with name ${nameOfListing}`);
    }

};
