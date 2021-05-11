let express = require("express");
let app = express();
var mongoose = require("mongoose");

const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/tripspaceDB";
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, dbOptions);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Connected to DB");
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
    module.exports.Collection = names;
  });
});

let http = require("http").createServer(app);

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

//routes
var test = require("./test.js");
var userProf = require("./user-profile.js");
var driverSched = require("./driver-schedule.js");
var tripFinder = require("./trip-finder.js");
var viewTrip = require("./view-trip.js");
var bookTrip = require("./book-trip.js");

//both index.js and e.g. user-profile.js should be in same directory
app.use("/test", test);
app.use("/user-profile", userProf);
app.use("/driver-schedule", driverSched);
app.use("/trip-finder", tripFinder);
app.use("/view-trip", viewTrip);
app.use("/book-trip", bookTrip);

http.listen(port, () => {
  console.log("Listening on port ", port);
});
