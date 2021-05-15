let express = require("express");
let app = express();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";
let http = require('http').createServer(app);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}))

//routes
var test = require('./test.js');
var userProf = require('./user-profile.js');
var driverSched = require('./driver-schedule.js');
var tripFinder = require('./trip-finder.js');
var viewTrip = require('./view-trip.js');
var bookTrip = require('./book-trip.js');
var editProfile = require('./editProfile.js');

//both index.js and e.g. user-profile.js should be in same directory
app.use('/test', test);
app.use('/user-profile', userProf);
app.use('/driver-schedule', driverSched);
app.use('/trip-finder', tripFinder);
app.use('/view-trip', viewTrip);
app.use('/book-trip', bookTrip);
app.use('/editProfile', editProfile)

http.listen(port,()=>{
	console.log("Listening on port ", port);
});
