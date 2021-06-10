const express = require("express");
const app = express();

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

app.get("/about", async (req, res, next) => {
  await aboutPage.displayAboutPage(res);
});

app.get("/contact", async (req, res, next) => {
  await contactPage.displayContactPage(res);
});

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});