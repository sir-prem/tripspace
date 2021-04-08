let express = require("express");
let app = express();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";
let http = require('http').createServer(app);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({
  extended: true
}))

//routes
var test = require('./test.js');
var userProf = require('./user-profile.js');

//both index.js and things.js should be in same directory
app.use('/test', test);
app.use('/user-profile', userProf);

http.listen(port,()=>{
	console.log("Listening on port ", port);
});
