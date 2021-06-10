const express = require("express");
const app = express();
const Booking = require('./Models/booking')
const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server);

const port = 4000;


var uri = "mongodb+srv://cluster0.7hvms.mongodb.net/";

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
let aboutPage = require('./Views/about-page');
let contactPage = require('./Views/contact-page');
let newDriver = require('./Views/new-driver');
let newUser = require('./Views/new-user');
var editProfile = require('./Routes/editProfile');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
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

app.get("/about", async (req, res, next) => {
  await aboutPage.displayAboutPage(res);
});

app.get("/contact", async (req, res, next) => {
  await contactPage.displayContactPage(res);
});

server.listen(port, function() {
  console.log("Server is running on Port: " + port);
});
