let U = require('../Views/utilities');
var out;

async function displayBookingsByUserPage(array) {
    out = ``;
    out = await U.addHeaderHTML(out);
    out = await U.openingHtmlElements(out);
    out = await U.addPageTitle( 12, 12, "My Trip Bookings", out );

    out += `<div class="row">`;
    out =       await U.myTripBookingsCard( 12, 12, array, out);
    out += '</div>';

    out = await U.closingHtmlElements(out);
    out = await U.addFooterHTML(out);
    return out;
}

async function displayUserBookingDetailsPage(res, outputJSON) {
    var driverTrip = outputJSON.tripLinkedtoThisBooking;
    var dateString = outputJSON.dateJSON.dateString;
    var driverInfo = outputJSON.driverInfo;
    var userBooking = outputJSON.userBooking;
    var bookingStats = outputJSON.bookingStats;
    var bookingComments = userBooking.comments;

    out = ``;
    out = await U.addHeaderHTML(out);
    out = await U.openingHtmlElements(out);
    out = await U.addPageTitle( 12, 12, "View Booking Details", out );

    console.log("driver trip: ");
    console.log(driverTrip);

    out += `<div class="row">`;    
    out =       await U.tripDetailsCard( 12, 3, driverTrip, dateString, out );

    out =       await U.addSpacerColumn( 1, out);
    out +=      `<div class="col s12 l8">`;
    out +=          `<div class="row">`;    
    out =               await U.bookingCommentsCard( 12, 12, bookingComments, out );
    out +=          `</div>`;
    out +=          `<div class="row">`;    
    out =               await U.userViewBookingStatsCard( 12, 7, bookingStats, out );
    out +=              `</div>`;
    out +=          `</div>`;  
    out +=      `</div>`;
    out += `</div>`;

    out += `<div class="row">`; 
    out =       await U.driverInfoCard( 12, 3, driverInfo, out );
    out += `</div>`;

    out = await U.closingHtmlElements(out);
    out = await U.addFooterHTML(out);
    res.send(out);
}

module.exports = {
    displayBookingsByUserPage,
    displayUserBookingDetailsPage
};