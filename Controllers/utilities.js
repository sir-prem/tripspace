const UserModel = require('../Models/user');

function consoleLogHeader(title) {
    console.log(' ');
    console.log('+==============================================================+');
    console.log('|                                                              |');
    console.log(`|          ${title}                                            `);
    console.log('|                                                              |');
    console.log('+--------------------------------------------------------------+');
    console.log(' ');
}

async function getDateJSON(driverTripDate) {
    var date = new Date(driverTripDate);
    var dateString = date.toDateString();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    
    //console.log("dateString is: " + dateString);
    //console.log("dd is: " + dd);
    //console.log("yyyy is: " + yyyy);
    //console.log("mm is: " + mm);

    var dateJSON = { dateString, dd, mm, yyyy };
    return dateJSON;
}

async function addNameToBooking(thisBooking) {
    const userWhoBooked = await UserModel.findOne( { username: thisBooking.userID },{ __v:0 } );
    //console.log("userWhoBooked is:");
    //console.log(userWhoBooked);
    //console.log("givenname is: " + userWhoBooked.givenname);

    var thisBookingWithNames = {
        tripID: thisBooking.tripID,
        userID: thisBooking.userID,
        cargoSpace: thisBooking.cargoSpace,
        seatSpace: thisBooking.seatSpace,
        comments: thisBooking.comments,
        givenname: userWhoBooked.givenname, 
        lastname: userWhoBooked.lastname 
    }
    return thisBookingWithNames;

}

module.exports = {
    consoleLogHeader,
    getDateJSON,
    addNameToBooking
};