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


app.use(express.json());
app.use(express.static(__dirname + '/Views'));

const user = require('./Routes/user');
app.use('/user', user);


const bookTrip = require('./Routes/book-trip');
app.use('/book-trip', bookTrip);




app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.get("/someroute", (req, res, next) => {
    res.send("SOME ROUTE's hello world");
});


app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});