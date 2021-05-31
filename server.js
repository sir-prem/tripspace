const express = require("express");
const app = express();
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
let newDriver = require('./Views/new-driver');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/Views'));

app.use('/user', user);
app.use('/trip', bookTrip);
app.use('/booking', booking);

app.get("/", async (req, res, next) => {
  await homePage.displayHomePage(res);
});

app.get("/new-driver", async (req, res, next) => {
  await newDriver.displayNewDriverPage(res);
});

/*
app.get("/someroute", (req, res, next) => {
    res.send("SOME ROUTE: hello world");
});
*/

server.listen(port, function() {
  console.log("Server is running on Port: " + port);
});