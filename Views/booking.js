let U = require('../Views/utilities');
let Util = require('../Controllers/utilities');
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

async function editBookingDetails(res, userBooking) {
    var out = ``;
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Edit Booking", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l2" id="green-border"><p>SPACER</p></div>

                    <div class="col s12 l3" id="green-border">
                        <div class="row">`;
    out =                   await U.editBookingInfoView(out, userBooking);
    out += `                    <p><form method="POST" action="/booking/editBooking-details">

    <p><button class="btn waves-effect waves-light light-green darken-1"
        type="submit" style="margin-left:70%;margin-top:2%;">Edit</button>
</form></p>

<p><button class="btn waves-effect waves-light light-green darken-1"
type="submit" style="margin-left:70%;margin-top:2%;">Cancel</button>
</form></p>

<p><form method="GET" action="">
    <button class="btn waves-effect waves-light light-green darken-1"
        type="submit" style="margin-left:70%;margin-top:2%;">Back</button>
</form></p>`
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

async function bookingDetails(res, outputJSON) {
    var driverTrip = outputJSON.tripLinkedtoThisBooking;
    var dateString = outputJSON.dateJSON.dateString;
    var driverInfo = outputJSON.driverInfo;
    var userBooking = outputJSON.userBooking;
    var bookingStats = outputJSON.bookingStats;
    var bookingComments = userBooking.comments;

    console.log("driver trip: ");
    console.log(driverTrip);


    var out = ``;
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Booking Details", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l2" id="green-border"><p>SPACER</p></div>

                    <div class="col s12 l3" id="green-border">
                        <div class="row">`;
    out =                   await U.tripDetailsCard( 12, 12, driverTrip, dateString, out );
    out += `            </div>
                        <div class="row">`;
    out =                   await U.driverInfoCard( 12, 12, driverInfo, out );
    out += `            </div>
                    </div>

                    <div class="col s12 l4" id="green-border" style="margin-left:2%;">
                        <div class="row">`;
    out =                   await U.bookingCommentsCard( 12, 12, bookingComments, out );
    out += `            </div>
                        <div class="row">`;
    out =                   await U.userViewBookingStatsCard( 12, 12, bookingStats, out );
    out += `            </div>
                    </div>

                    <p><form method="POST" action="/booking/editBooking-details">
                    <input type="hidden" name="tripID" value=${userBooking.tripID}>
                    <input type="hidden" name="userID" value=${userBooking.userID}>
                        <button class="btn waves-effect waves-light light-green darken-1"
                            type="submit" style="margin-left:70%;margin-top:2%;">Edit booking</button>
                    </form></p>

                    <p><form method="GET" action="/user/${userBooking.userID}">
                        <button class="btn waves-effect waves-light light-green darken-1"
                            type="submit" style="margin-left:70%;margin-top:2%;">Back to Profile</button>
                    </form></p>
                    
                </div>
            </main>
                    `;
    out = await U.addFooterHTML(out);
    res.send(out);
}

async function bookingConfirmation(booking, user, trip, dateString) {
    Util.consoleLogHeader('booking Confirmation');
    var out = ``;        
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out =       await U.addPageTitle(12, 12, "Booking Confirmation", out);
    
    out += `    <div class="row" id="red-border">
    
                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>
                    
                    <div class="col s12 l6" id="green-border">
                        <div class="row grey darken-4">
                            <img src="/images/pic13.png" style="max-height:300px;">
                        </div>
                        <div class="row grey lighten-5" style="padding:2%;">
                            <h4>Space Booked Successfully</h4>
                            <p>Congratulations <b>${user.givenname}</b>, your booking for the trip going 
                                from <b>${trip.fromSuburb}</b> to <b>${trip.toSuburb}</b> on <b>${dateString}</b> 
                                has been booked successfully. We hope you and/or your cargo reaches its destination 
                                safely. Please remember to rate and review your experience after the trip is 
                                completed.</p><br>
                        
                            <h5>Booking Summary</h5><br>
                            <p><h6>Route</h6>
                            <table>
                            <tr><td><b>From</b></td><td>${trip.fromSuburb}</td></tr>
                            <tr><td><b>To</b></td><td>${trip.toSuburb}</td></tr>
                            </table>
                            </p><br>
                            <p><h6>Date & Time</h6>
                            <table>
                            <tr><td><b>Date</b></td><td>${dateString}</td></tr>
                            <tr><td><b>Departs</b></td><td>${trip.departureTime}</td></tr>
                            <tr><td><b>Arrives</b></td><td>${trip.arrivalTime}</td></tr>
                            </table>
                            </p><br>
                            <p><h6>Your Space On This Trip</h6>
                                <table>
                                    <tr><td><b>Cargo Space</b></td><td>${booking.cargoSpace}m3</td></tr>
                                    <tr><td><b>Seat Space</b></td><td>${booking.seatSpace} seat(s)</td></tr>
                                </table>
                            </p><br>
                            <p><h6>Reference Number</h6>
                                <p>Your booking reference number is <b>${booking._id}</b>.</p>
                            </p><br>
                        </div>
                        <div class="row">
                            <div class="col s12 l2" id="green-border"><p>SPACER</p></div>
                            
                            <div class="col s12 l4" id="green-border">
                                <p>
                                    <form method="GET" action="/user/${user.username}">                                    
                                        <button class="btn waves-effect waves-light light-green darken-1" 
                                            type="submit">Back to Profile</button>
                                    </form>                                    
                                </p>
                            </div>

                            <div class="col s12 l2" id="green-border"><p>SPACER</p></div>
                            
                            <div class="col s12 l4" id="green-border">
                                <p>                                    
                                    <form method="GET" action="/trip/trip-finder">
                                        <input type="hidden" name="username" value="${user.username}" />
                                        <button class="btn waves-effect waves-light light-green darken-1" 
                                            type="submit">Find another trip</button>
                                    </form>
                                </p>
                            </div>

                        </div>
                    </div>

                    <div class="col s12 l3" id="green-border"><p>SPACER</p></div>

                </div>

            </main>`;

    out = await U.addFooterHTML(out);
    return out;
}

module.exports = {
    displayBookingsByUserPage,
    bookingDetails,
    bookingConfirmation,
    editBookingDetails
};