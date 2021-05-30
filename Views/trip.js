let U = require('../Views/utilities');
var out;

async function displayTripsByDriverPage(res, array) {
    out = ``;
    out = await U.addHeaderHTML(out);
    out = await U.openingHtmlElements(out);

    out += `<div class="row">`;
    out =       await U.driverTripsCard( 12, 12, array, out);
    out += '</div>';

    out = await U.closingHtmlElements(out);
    out = await U.addFooterHTML(out);
    res.send(out);
}

async function displayDriverTripDetailsPage(res, outputJSON) {
    var driverTrip = outputJSON.driverTrip;
    var dateString = outputJSON.dateJSON.dateString;
    var userBookingsArray = outputJSON.bookingsForTripWithNames;
    var bookingStats = outputJSON.bookingStats;

    out = ``;
    out = await U.addHeaderHTML(out);
    out = await U.openingHtmlElements(out);

    console.log("driver trip: ");
    console.log(driverTrip);

    out += `<div class="row">`;    
    out =       await U.tripDetailsCard( 12, 3, driverTrip, dateString, out );
    out =       await U.addSpacerColumn( 1, out);
    out +=      `<div class="col s12 l8">`;
    out +=          `<div class="row">`;    
    out =               await U.userBookingsCard( 12, 12, userBookingsArray, out );
    out +=          `</div>`;
    out +=          `<div class="row">`;    
    out =               await U.bookingStatsCard( 12, 6, bookingStats, out );
    out +=          `</div>`;
    
    out +=      `</div>`;
    out += `</div>`;

    out = await U.closingHtmlElements(out);
    out = await U.addFooterHTML(out);
    res.send(out);
}

module.exports = {
    displayTripsByDriverPage,
    displayDriverTripDetailsPage
};