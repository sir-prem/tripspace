let U = require('../Views/utilities');
let Util = require('../Controllers/utilities');
var out;

async function displayTripsByDriverPage(res, array) {
    out = ``;
    out = await U.addHeaderHTML(out);
    out = await U.openingHtmlElements(out);
    out = await U.addPageTitle( 12, 12, "My Trips", out );

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
    out = await U.addPageTitle( 12, 12, "View Trip Details", out );

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
    out =               await U.bookingStatsCard( 12, 7, bookingStats, out );
    out +=          `</div>`;
    
    out +=      `</div>`;
    out += `</div>`;

    out = await U.closingHtmlElements(out);
    out = await U.addFooterHTML(out);
    res.send(out);
}

async function tripFinder() {
    Util.consoleLogHeader('trip Finder');
    var out = ``;
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Find A Trip", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                    <div class="col s12 l6" id="green-border">
                        <p><img src="/images/pic18.png" style="max-height:200px;"/></p>
                    </div>
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                    
                </div>

                <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                    <div class="col s12 l6 white-text" id="green-border">
                        <p><blockquote>Our package was delivered on time, and we paid about half the price. 
                        The driver was professional and friendly. Thank you TripSpace. <br><b>- Mr and Mrs Brown.</b></blockquote></p>
                    </div>
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                    
                </div>

                <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                    <div class="col s12 l6 grey darken-4 z-depth-1" id="green-border">
                        <form method="GET" action="/trip/trip-finder">
                            <div class="row" style="margin-top:2%;">
                                <div class="col s12 l3 brown darken-1 white-text z-depth-1" style="margin-left:6%;">
                                    <h5 style="background-color:#3e2723;">Where</h5>
                                    <p>From: <input type="text" name="fromSub" /></p>
                                    <p>To: <input type="text" name="toSub" /></p>
                                </div>
                                <div class="col s12 l3 brown darken-1 white-text z-depth-1" style="margin-left:7%;">
                                    <h5 style="background-color:#3e2723;">When</h5>
                                    <p>Between: <input type="date" name="depDate" /></p>
                                    <p>And: <input type="date" name="arrDate" /></p>
                                </div>
                                <div class="col s12 l3 brown darken-1 white-text z-depth-1" style="margin-left:7%;">
                                    <h5 style="background-color:#3e2723;">Space Required</h5>
                                    <p>Cargo (m3): <input type="text" name="cargoSpace" /></p>
                                    <p>Seats: <input type="text" name="seatSpace" /></p>
                                </div>
                            </div>
                            <div class="row">
                                <input type="hidden" name="searched" value="true" />
                                <button class="btn waves-effect waves-light light-green darken-1" 
                                    type="submit" style="margin-left:85%;">Find</button>
                            </div>
                        </form>
                    </div>
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                    
                </div>

            </main>`;



    return out;
}

async function tripFinderResults(results, out) {
    Util.consoleLogHeader('Trip Finder Results');
    
    console.log(results);
    
    out += `
            <main>
            <div class="row" id="red-border">
            
                <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                <div class="col s12 l6 grey lighten-5" id="green-border">
                    <h6>Search Results</h6>`;
    if (results.length == 0) {
                    out += `<p>There are no results from your search. Please try again.</p>`;
    }
    else {

                    out += `<table>
                                <tr>
                                    <th>Driver</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Date</th>
                                    <th>Departs</th>
                                    <th>Arrives</th>
                                    <th>Vehicle</th>
                                    <th>Cargo Capacity</th>
                                    <th>Seats Capacity</th>
                                    <th></th>
                                </tr>
                    `;

        for (var i=0; i< results.length; i++){
            var result = results[i];
            var dateJSON = await Util.getDateJSON(result.date);
            var viewURL = `/trip/${result._id}`;
                    out +=      `<tr>
                                    <td>${result.username}</td>
                                    <td>${result.fromSuburb}</td>
                                    <td>${result.toSuburb}</td>
                                    <td>${dateJSON.dateString}</td>
                                    <td>${result.departureTime}</td>
                                    <td>${result.arrivalTime}</td>
                                    <td>${result.vehicle}</td>
                                    <td>${result.cargoSpace}</td>
                                    <td>${result.seatSpace}</td>
                                    <td>
                                        <form method="GET" action="${viewURL}">
                                            <button class="btn waves-effect waves-light light-green darken-1" 
                                            type="submit">View</button>
                                        </form>
                                    </td>
                                </tr>`;
        }
                    out += `</table>`;
    }
    out +=         `</div>
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                </div>
            </main>
    `;
   
    return out;

}


module.exports = {
    displayTripsByDriverPage,
    displayDriverTripDetailsPage,
    tripFinder,
    tripFinderResults
};