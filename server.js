const express = require("express");
const app = express();
const Booking = require('./models/booking')
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);
const port = 4000;

//initialize socketio
io.on('connect', function(socket){
  console.log('connected to socket.io!')

  //broadcast message to users
  socket.on('send-notification', function(message){
    socket.broadcast.emit('new-notification', message)
  });

  //disconnect socketio
  socket.on('disconnect', function () {
    console.log('user disconnected');
  })
})

var uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

const mongoose = require("mongoose");

mongoose
  .connect(
    uri,
    {
      dbName: 'tripspaceDBTest',
      user: 'admin',
      pass: '00000',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }   
  )
  .then(
      () => {
          console.log('MongoDB connected...');
      }
  )

const user = require('./Routes/user');
const bookTrip = require('./Routes/trip');
const booking = require('./Routes/booking')
let homePage = require('./Views/homepage');
let newDriver = require('./Views/new-driver');
let newUser = require('./Views/new-user');
var editProfile = require('./Routes/editProfile');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/Views'));

app.use('/user', user);
app.use('/trip', bookTrip);
app.use('/booking', booking);
app.use('/editProfile', editProfile)

app.get("/", async (req, res, next) => {
  await homePage.displayHomePage(res);
});

app.get("/new-driver", async (req, res, next) => {
  await newDriver.displayNewDriverPage(res);
});

app.get("/new-user", async (req, res, next) => {
  await newUser.displayNewUserPage(res);
});

//get users tripID and finds in the mongodb
app.post('/api', function(req, res) {
  Booking.findOne(req.body)
      .then(function(data) {
        res.json({
          status: 'success',
          tripID: data.tripID
      });
  })
  .catch(function(error) {
      console.log('invalid input')
      res.json(error);
  });
});

/*
app.get("/someroute", (req, res, next) => {
    res.send("SOME ROUTE: hello world");
});
*/

server.listen(port, function() {
  console.log("Server is running on Port: " + port);
});