let U = require('../Views/utilities');
let Util = require('../Controllers/utilities');

async function editTrip(res, trip, id) {
    var out = ``;
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Edit Trip", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l2" id="green-border"><p>SPACER</p></div>

                    <div class="col s12 l3" id="green-border">
                        <div class="row">
                        <form method="POST" action="/trip/edit">
                        `;
    out =                   await U.editTripInfoView(out, trip, id);
    out += `                    

    <p><button class="btn waves-effect waves-light light-green darken-1"
        type="submit" style="margin-left:70%;margin-top:2%;">Edit</button>
        </p>
        </form>
        <form method="POST" action="/trip/cancel">
        <input type="hidden" name="id" value=${id} />
        <p><button class="btn waves-effect waves-light light-green darken-1"
type="submit" style="margin-left:70%;margin-top:2%;">Cancel Trip</button>
</p>
</form>
<form method="POST" action="/trip/back">
        <input type="hidden" name="id" value=${id} />
        <p><button class="btn waves-effect waves-light light-green darken-1"
        type="submit" style="margin-left:70%;margin-top:2%;">Back</button></p>
        </form>


`
    out += `            </div>
                        <div class="row">`;

    out += `            </div>
                    </div>

                    <div class="col s12 l4" id="green-border" style="margin-left:2%;">
                        <div class="row">`;

    out += `            </div>
                        <div class="row">`;

    out += `            </div>
                    </div>


                    
                </div>
            </main>
                    `;
    out = await U.addFooterHTML(out);
    res.send(out);
}

async function tripDetails(res, outputJSON) {
    var driverTrip = outputJSON.driverTrip;
    var dateString = outputJSON.dateJSON.dateString;
    var userBookingsArray = outputJSON.bookingsForTripWithNameAndProfilePic;
    var bookingStats = outputJSON.bookingStats;

    var out = ``;
    
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Trip Details", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l2" id="green-border"><p></p></div>

                    <div class="col s12 l3" id="green-border">
                        <div class="row">`;
    out =                   await U.tripDetailsCard( 12, 12, driverTrip, dateString, out );
    out += `            </div>
                    </div>

                    <div class="col s12 l5" id="green-border" style="margin-left:2%;">
                        <div class="row">`;
    out =                   await U.userBookingsCard( 12, 12, userBookingsArray, out );
    out += `            </div>
                        <div class="row">`;
    out =                   await U.bookingStatsCard( 12, 7, bookingStats, out );
    out += `            </div>
                    </div>

                    <p><form method="POST" action="/trip/editTrip">
                    <input type="hidden" name="tripID" value=${driverTrip._id}>
                    <button class="btn waves-effect waves-light light-green darken-1"
                        type="submit" style="margin-left:70%;margin-top:2%;">Edit</button>
                </form></p>
                    
                    <p><form method="GET" action="/user/${driverTrip.username}">
                        <button class="btn waves-effect waves-light light-green darken-1"
                            type="submit" style="margin-left:70%;margin-top:2%;">Back to Profile</button>
                    </form></p>
                    
                </div>
            </main>
                    `;
    out = await U.addFooterHTML(out);
    res.send(out);
}

async function tripFinder(username, searchSubmitted) {
    Util.consoleLogHeader('trip Finder');
    var out = ``;
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Find A Trip", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p></p></div>
                    <div class="col s12 l6" id="green-border">
                        <p><img src="/images/pic18.png" style="max-height:200px;"/></p>
                    </div>
                    <div class="col s12 l3" id="green-border"><p></p></div>
                    
                </div>

                <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p></p></div>
                    <div class="col s12 l6 white-text" id="green-border">
                        <p><blockquote>Our package was delivered on time, and we paid about half the price. 
                        The driver was professional and friendly. Thank you TripSpace. <br><b>- Mr and Mrs Brown.</b></blockquote></p>
                    </div>
                    <div class="col s12 l3" id="green-border"><p></p></div>
                    
                </div>

                <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p></p></div>
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
                                <input type="hidden" name="username" value="${username}" />
                                <button class="btn waves-effect waves-light light-green darken-1" 
                                    type="submit" style="margin-left:85%;">Find</button>
                            </div>
                        </form>
                    </div>
                    <div class="col s12 l3" id="green-border"><p></p></div>
                    
                </div>

            </main>`;
    if (searchSubmitted == 'false') {
        out = await U.addFooterHTML(out);
    }



    return out;
}

async function tripFinderResults(username, results, out) {
    Util.consoleLogHeader('Trip Finder Results');
    
    console.log(results);
    
    out += `
            <main>
            <div class="row" id="red-border">
            
                <div class="col s12 l3" id="green-border"><p></p></div>
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
            var trip = results[i];
            var dateJSON = await Util.getDateJSON(trip.date);
            var viewURL = `/trip/user/trip-details/${trip._id}/${username}?fromSub=${trip.fromSuburb}&toSub=${trip.toSuburb}`;
            console.log("viewURL is: " + viewURL);
                    out +=      `<tr>
                                    <td>${trip.username}</td>
                                    <td>${trip.fromSuburb}</td>
                                    <td>${trip.toSuburb}</td>
                                    <td>${dateJSON.dateString}</td>
                                    <td>${trip.departureTime}</td>
                                    <td>${trip.arrivalTime}</td>
                                    <td>${trip.vehicle}</td>
                                    <td>${trip.cargoSpace}</td>
                                    <td>${trip.seatSpace}</td>
                                    <td>
                                        <button class="btn waves-effect waves-light light-green darken-1"
                                                onclick="location.href='${viewURL}'" type="button">
                                                        View</button>
                                    </td>
                                </tr>`;
        }
                    out += `</table>`;
    }
    out +=         `</div>
                    <div class="col s12 l3" id="green-border"><p></p></div>
                </div>
            </main>
    `;

    out = await U.addFooterHTML(out);
   
    return out;

}

async function tripAdder(driverUsername) {
    Util.consoleLogHeader('trip Adder');
    var out = ``;
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Add New Trip", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p></p></div>
                    
                    <div class="col s12 l2" id="green-border">
                        <div class="row">
                            <p><img src="/images/pic19.png" width="100%" style="max-height:200px;"/></p>
                        </div>
                        <div class="row white-text">
                            <p><blockquote>I now earn $300 extra per week, without driving any extra than I normally would.
                            My vehicle space is now being utilised by doing jobs here and there via TripSpace.
                            TripSpace allows me to do pick-ups on routes where I normally would be driving on an empty load. 
                            I'm making money through TripSpace just from driving the same routes I usually drive.
                            <br><b>- Neil Armstrong</b> <i>TripSpace driver</i></blockquote></p>
                        </div>
                    </div>

                    <div class="col s12 l4" id="green-border" style="margin-left:2%;">
                        
                            <form id="addTripForm" method="POST" action="/trip">
                                <div class="row" style="margin-top:2%;">
                                    <div class="col s12 l12 brown darken-1 white-text z-depth-1" style="margin-left:0%;">
                                        <h5 style="background-color:#3e2723;">Where</h5>
                                        <p>From: <input type="text" name="fromSuburb" /></p>
                                        <p>To: <input type="text" name="toSuburb" /></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 l12 brown darken-1 white-text z-depth-1" style="margin-left:0%;">
                                        <h5 style="background-color:#3e2723;">When</h5>
                                        <p>Date: <input type="date" name="date" /></p>
                                        <p>Between: <input type="time" name="departureTime" /></p>
                                        <p>And: <input type="time" name="arrivalTime" /></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 l12 brown darken-1 white-text z-depth-1" style="margin-left:0%;">
                                        <h5 style="background-color:#3e2723;">Space Available</h5>
                                        <p>Vehicle Type: <input type="text" name="vehicle" /></p>
                                        <p>Cargo (m3): <input type="text" name="cargoSpace" /></p>
                                        <p>Seats: <input type="text" name="seatSpace" /></p>
                                    </div>
                                </div>
                                <input type="hidden" name="username" value="${driverUsername}" />
                            </form>
                                <div class="row">
                                    <table>
                                        <tr>
                                            <td>
                                                <form id="backBtn" method="GET" action="/user/${driverUsername}">
                                                    <button form="backBtn" class="btn waves-effect waves-light light-green darken-1" 
                                                        type="submit" style="margin-left:0%;">Back to Profile</button>
                                                </form>
                                            </td>
                                            <td>
                                                <button form="addTripForm" class="btn waves-effect waves-light light-green darken-1" 
                                                    type="submit" style="margin-left:50%;">Add Trip</button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                    </div>
                    
                    <div class="col s12 l2" id="green-border"><p></p></div>
                    
                </div>
            </main>`;

    out = await U.addFooterHTML(out);
    return out;
}

async function tripAdded(addedTrip, driver) {
    Util.consoleLogHeader('trip Adder');
    var out = ``;
    var dateJSON = await Util.getDateJSON(addedTrip.date);    
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Trip Added", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p></p></div>
                    
                    <div class="col s12 l6" id="green-border">
                        <div class="row grey darken-4">
                            <img src="/images/pic10.png" style="max-height:300px;">
                        </div>
                        <div class="row grey lighten-5" style="padding:2%;">
                            <h5>Trip Successfully Added</h1>
                            <p>Congratulations <b>${driver.givenname}</b>, your trip going from <b>${addedTrip.fromSuburb}</b> to 
                            <b>${addedTrip.toSuburb}</b> on <b>${dateJSON.dateString}</b> has been added successfully. We hope that 
                            your trip gets fully booked, and your trip-space gets fully utilised!</p>
                        </div>
                        <div class="row">
                            <div class="col s12 l2" id="green-border"><p></p></div>
                            
                            <div class="col s12 l4" id="green-border">
                                <p>
                                    <form method="GET" action="/user/${addedTrip.username}">                                    
                                        <button class="btn waves-effect waves-light light-green darken-1" 
                                            type="submit">Back to Profile</button>
                                    </form>                                    
                                </p>
                            </div>

                            <div class="col s12 l2" id="green-border"><p></p></div>
                            
                            <div class="col s12 l4" id="green-border">
                                <p>                                    
                                    <form method="GET" action="/trip/add/${addedTrip.username}">                                    
                                        <button class="btn waves-effect waves-light light-green darken-1" 
                                            type="submit">Add another trip</button>
                                    </form>
                                </p>
                            </div>

                        </div>
                    </div>

                    <div class="col s12 l3" id="green-border"><p></p></div>

                </div>

            </main>`;

    out = await U.addFooterHTML(out);
    return out;
        
}

async function userTripDetails(json) {
    Util.consoleLogHeader('User: Trip Details');
    var out = ``;
    var tripID = json.tripID;
    var username = json.username;
    var driver = json.driver;
    var driverTrip = json.driverTrip;
    var dateJSON = json.dateJSON;
    var dateString = dateJSON.dateString;
    var bookingStats = json.bookingStats;
    var toSub = json.toSub;
    var fromSub = json.fromSub;
    var backToSearchResultsURL = `/trip/trip-finder?fromSub=${fromSub}&toSub=${toSub}&username=${username}&searched=true`;
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "User: Trip Details", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l2" id="green-border"><p></p></div>
                    
                    <div class="col s12 l3" id="green-border">`;
    out =               await U.driverInfoCard( 12, 12, driver, out );
    
    out +=          `</div>

                    <div class="col s12 l5" id="green-border" style="margin-left:2%;">`;
    out =               await U.tripDetailsCard( 12, 12, driverTrip, dateString, out );
    out +=          `</div>

                    <div class="col s12 l1" id="green-border"><p></p></div>

                </div>

                <div class="row" id="red-border">
                    <div class="col s12 l4" id="green-border"><p></p></div>
                        
                    <div class="col s12 l4 grey lighten-5" id="green-border">
                        <h5>Space Availabile</h5>
                        <form id="bookingForm" method="POST" action="/booking" id="usrform">
                            <table>
                                <tr>
                                    <th></th>
                                    <th>Space Required by User</th>
                                    <th>Space Remaining on Trip</th>
                                </tr>
                                <tr>
                                    <td>Cargo: </td>
                                    <td><input type="textarea  rows="4" cols="50"" name="cargoSpace" /></td>
                                    <td>${bookingStats.remainingCargo}m3</td>
                                </tr>
                                <tr>
                                    <td>Seats: </td>
                                    <td><input type="textarea" name="seatSpace" /></td>
                                    <td>${bookingStats.remainingSeats}</td>
                                </tr>                                
                                <tr>
                                    <td>Comments: </td>
                                    <td colspan="2"><textarea name="comments" form="bookingForm"></textarea></td>
                                    
                                </tr>                                
                            </table>
                            <input type="hidden" name="tripID" value="${tripID}" />
                            <input type="hidden" name="userID" value="${username}" />
                        <form>
                            <p>
                                <table>
                                    <tr>
                                        <td>
                                            <button class="btn waves-effect waves-light light-green darken-1"
                                            onclick="location.href='${backToSearchResultsURL}'" type="button">
                                                    Back To Search Results</button>
                                        </td>
                                        <td>
                                            <button form="bookingForm" class="btn waves-effect waves-light light-green darken-1" 
                                                        type="submit" style="margin-left:40%;">Book My Space</button>
                                        </td>
                                    </tr>
                                </table>
                            </p>
                            
                            

                        

                    </div>

                    <div class="col s12 l2" id="green-border" style="margin-left:2%;">
                        <div class="row">
                            <img src="/images/pic9.png" width="100%"/>
                        </div>
                        <div class="row">
                            <img src="/images/pic14.png" width="100%"/>
                        </div>
                    </div>

                    <div class="col s12 l1" id="green-border"><p></p></div>
                </div>

            </main>`;

    out = await U.addFooterHTML(out);
    return out;
}


module.exports = {    
    tripDetails,
    tripFinder, 
    tripFinderResults,
    tripAdder,
    tripAdded,
    userTripDetails,
    editTrip
};