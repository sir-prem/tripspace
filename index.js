let express = require("express");
let app = express();
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);

//initialize socketio
io.on('connect', function(socket){
  console.log('connected to socket.io!')

  //emits message to users
  socket.on('send-notification', function(message){
    io.emit('new-notification', message)
  });

  //disconnect socketio
  socket.on('disconnect', function () {
    console.log('user disconnected');
})

});
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";
// let http = require('http').createServer(app);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({
  extended: true
}))

//routes
var test = require('./test.js');
var userProf = require('./user-profile.js');
var driverSched = require('./driver-schedule.js');
var tripFinder = require('./trip-finder.js');
var viewTrip = require('./view-trip.js');
var bookTrip = require('./book-trip.js');

//both index.js and e.g. user-profile.js should be in same directory
app.use('/test', test);
app.use('/user-profile', userProf);
app.use('/driver-schedule', driverSched);
app.use('/trip-finder', tripFinder);
app.use('/view-trip', viewTrip);
app.use('/book-trip', bookTrip);

server.listen(port,()=>{
	console.log("Listening on port ", port);
});
