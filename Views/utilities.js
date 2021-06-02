
async function addHeaderHTML(out) {
    
    out += '<html>';
	out += '    <head>';
    out += '        <!-- Compiled and minified CSS -->';
    out += '        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
    out += '        <link rel="stylesheet" href="/style.css">';
    out += '        <!-- Compiled and minified JavaScript -->';
    out += '        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';            
	out += '    </head>';
	out += '    <body>';
	out += '    	  <nav>';
	out += '    		<div class="nav-wrapper brown lighten-4">';
	out += '    		  <a href="#" class="brand-logo"><img src="/logo.png" width="120px"/></a>';
	out += '    		  <ul id="nav-mobile" class="right hide-on-med-and-down">';
	out += '    			<li><a href="./index.html">Home</a></li>';
	out += '    			<li><a href="./about.html">About</a></li>';
	out += '    			<li><a href="./contact.html">Contact</a></li>';
	out += '    		  </ul>';
	out += '    		</div>';
	out += '    	  </nav>';
    
    return out;
}

async function addFooterHTML(out) {

    out += '<footer class="page-footer brown darken-4 grey-text text-lighten-5">';
    out += '  <div class="container">';
    out += '    <div class="row">';
    out += '      <div class="col l6 s12">';
    out += '        <h5 class="white-text">Footer Content</h5>';
    out += '        <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>';
    out += '      </div>';
    out += '      <div class="col l4 offset-l2 s12">';
    out += '        <h5 class="white-text">Links</h5>';
    out += '        <ul>';
    out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>';
    out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>';
    out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>';
    out += '          <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>';
    out += '        </ul>';
    out += '      </div>';
    out += '    </div>';
    out += '  </div>';
    out += '  <div class="footer-copyright brown darken-3 grey-text text-lighten-5">';
    out += '    <div class="container">';
    out += '        © 2021 Copyright TripSPACE';
    out += '        <a class="grey-text text-lighten-4 right" href="#!">More Links</a>';
    out += '    </div>';
    out += '  </div>';
    out += '</footer>';

    out+= '    </body>';
    out+= '</html>';
    return out;
}

async function driverHomepageCard(sColSpan, lColSpan, out) {
    out += `<div class="col s${sColSpan} l${lColSpan} card" style="background-color: lightgrey;">`;
	out += '				<h2>Got some space?</h2>';
	out += '				<p>Have a vehicle, and do a bit of driving, often with the vehicle empty?';
	out += '				   Want to earn some extra income and do something good for the environment while you drive?';
	out += '				   Then why not sign up now and get started!</p>';
	out += '				<a href="./new-driver" class="waves-effect waves-light btn">New driver</a>';
	
	out += '				<p><br><br>';
	out += '				<p>Already a member? Then sign in below.</p>';
	out += '				<h4>Driver login</h4></p>';

	out += '				<form method="POST" action="/user/auth">';
	out += '					username: <input type="text" name="username" /><br>';
	out += '					password: <input type="text" name="password" /><br>';
	out += '					<button class="btn waves-effect waves-light" type="submit" name="action">Submit';
	out += '					  </button>';
	out += '				</form>';
	out += '			</div>';
    return out;
}

async function driverRegistrationFormCard(sColSpan, lColSpan, out) {
    out += `					<script>
    window.addEventListener('load', function () {
        document.querySelector('#profile_pic_src').addEventListener('change', function () {
            if (this.files && this.files[0]) {
                var img = document.querySelector('#profile_pic');
                var realImg = document.querySelector('#real_image');
                img.onload = () => {
                    URL.revokeObjectURL(img.src);  // no longer needed, free memory
                }

                img.src = URL.createObjectURL(this.files[0]); // set src to blob url
                var reader = new FileReader();
                reader.onload = function(event) {
                    console.log('File content:', event.target.result);
                    realImg.value = event.target.result;
                    console.log(realImg.value);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
</script>`;
    out += `            <div class="col s${sColSpan} l${lColSpan}" style="background-color: lightgrey;">`;
	out += `				<h1>Driver Sign-Up</h1>`;
	out += `				<h5>Start earning an <b>extra income</b>, and <b>helping the environment</b>`;
	out += `				   by utilising spare space in your vehicle.</h5>`;
	out += `				<h5>Register your details with us, and get started right now!</h5>`;
	out += `				<p>Not sure and want to know a bit more before you begin your journey with `;
	out += `				TripSpace? Click here to find out more...<br><br>`;
	out += `				<a href="./how-tripspace-works.html" class="waves-effect waves-light btn light-green darken-1">Find out more</a>`;
	out += `			</div>`;
	out += `			<div class="col s${sColSpan} l${lColSpan}" style="background-color: slategrey; color: white">`;
	out += `				<h4>Register here</h4>`;
	out += `				<p>Please fill in the below details.</p>`;
	out += `				<form method="POST" action="/user">`;
	out += `					username: <input type="text" name="username" /><br>`;
	out += `					password: <input type="text" name="password" /><br>`;
	out += `					Given name: <input type="text" name="givenname" /><br> `;
	out += `					Last name: <input type="text" name="lastname" /><br> `;
	out += `					Age: <input type="text" name="age" /><br> `;
	out += `					Gender: <input type="text" name="gender" /><br> `;
    out += `                    Profile picture: (Image should be smaller than 16MB)</br>`;
    out += `                    <input type='file' id="profile_pic_src"/></br>`;
    out += `                    <input type='text' name="profile_pic" id="real_image" style="display: none;"/>`;
    out += `                    <img id="profile_pic" width="100" height="100" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"></br></br>`;
	out += `					<input type="hidden" name="usertype" value="driver"/>`;
	out += `					<button class="btn waves-effect waves-light light-green darken-1" type="submit" name="action">Submit`;
	out += `					  </button>`;
	out += `				</form>`;
	out += `			</div>`;
    return out;
}

async function welcomeBackCard(sColSpan, lColSpan, givenname, out) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<h4>Welcome back, <b>' + givenname + '</b></h4>';
    out += '</div>';
    return out;
}

async function thankYouCard(sColSpan, lColSpan, givenname, out) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<h4>Thanks for registering, <b>' + givenname + '</b></h4>';
    out += '</div>';
    return out;
}

async function profileInfoCard(sColSpan, lColSpan, result, out) {
	//out += '<div class="row">';
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<div class="col s12 l6 grey lighten-5">';
    out +=		   '<table>';
    out +=				'<tr><td><b>Username</b></td><td>' + result.username + '</td></tr>';
    out +=				'<tr><td><b>Given name</b></td><td>' + result.givenname + '</td></tr>';
    out +=				'<tr><td><b>Last name</b></td><td>' + result.lastname + '</td></tr>';
    out +=				'<tr><td><b>age</b></td><td>' + result.age + '</td></tr>';
    out +=				'<tr><td><b>gender</b></td><td>' + result.gender + '</td></tr>';
    out +=		   '</table>';
	out += '	</div>';
    out += '	<div class="col s4 l4 grey lighten-5">';

	if (result.gender=="Male") {
		out +=		   '<img src="'+result.profile_pic+'" width=100% />';
	}
	else {
		out +=		   '<img src="'+result.profile_pic+'" width=100% />';
	}

	out +=	   '</div>';
	out += '</div>';
    return out;
}

async function driverTripsCard( sColSpan, lColSpan, array, out ) {
    
    const numberOfDriverTrips = array.length;
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <table>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Departing</th>
                        <th>Arriving</th>
                        <th>Vehicle</th>
                        <th>Cargo Space</th>
                        <th>Seat Space</th>
                        <th>Status</th>
                        <th>Link</th>
                    </tr>`;
                for (var i = 0; i < numberOfDriverTrips; i++) {
                    var thisDriverTrip = array[i].driverTrip;
                    var thisTripStatus = array[i].driverTripStatus;
                    var thisViewTripDetailsURL = array[i].viewTripDetailsURL;
                    var thisTripDate = array[i].dateJSON.dateString;
    out +=          `<tr>
                        <td>${thisDriverTrip.fromSuburb}</td>
                        <td>${thisDriverTrip.toSuburb}</td>
                        <td>${thisTripDate}</td>
                        <td>${thisDriverTrip.departureTime}</td>
                        <td>${thisDriverTrip.arrivalTime}</td>
                        <td>${thisDriverTrip.vehicle}</td>
                        <td>${thisDriverTrip.cargoSpace}</td>
                        <td>${thisDriverTrip.seatSpace}</td>
                        <td style="color:${thisTripStatus.colour};">${thisTripStatus.status}</td>
                        <td>
                            <form method="GET" action="/trip${thisViewTripDetailsURL}">
                                <button class="btn waves-effect waves-light light-green darken-3" type="submit" name="action">View</button>
                            </form>
                        </td>
                    </tr>`;
                }

    out +=      `</table>
            </div>`;
    return out;
}

async function tripDetailsCard( sColSpan, lColSpan, driverTrip, dateString, out ) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>Trip Info</h5>
                <table>
                    <tr> 
                        <td><b> Driver </b></td> 
                        <td> ${ driverTrip.username } </td> 
                    </tr>
                    <tr> 
                        <td><b> From </b></td> 
                        <td> ${ driverTrip.fromSuburb } </td> 
                    </tr>
                    <tr> 
                        <td><b> To </b></td> 
                        <td> ${ driverTrip.toSuburb } </td> 
                    </tr>
                    <tr> 
                        <td><b> Date </b></td> 
                        <td> ${ dateString } </td> 
                    </tr>
                    <tr> 
                        <td><b> Departing </b></td> 
                        <td> ${ driverTrip.departureTime } </td> 
                    </tr>
                    <tr> 
                        <td><b> Arriving </b></td> 
                        <td> ${ driverTrip.arrivalTime } </td> 
                    </tr>
                    <tr> 
                        <td><b> Vehicle </b></td> 
                        <td> ${ driverTrip.vehicle } </td> 
                    </tr>
                    <tr> 
                        <td><b> Cargo Space </b></td> 
                        <td> ${ driverTrip.cargoSpace } </td> 
                    </tr>
                    <tr> 
                        <td><b> Seat Space </b></td> 
                        <td> ${ driverTrip.seatSpace } </td> 
                    </tr>                    
                </table>
            </div>`;
    return out;
}

// this function is for Drivers to see User Bookings on their trip
async function userBookingsCard (sColSpan, lColSpan, userBookingsArray, out ) {
    var numberOfUserBookings = userBookingsArray.length;

    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>User Bookings</h5>`

    
    out +=      `<p>There are <b>${numberOfUserBookings}</b> user bookings for this trip.</p>`;

    if (numberOfUserBookings > 0) {
    
        out +=      `<table>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Cargo Space</th>
                            <th>Seat Space</th>
                            <th>Comments</th>
                        </tr>`;

        for ( var i = 0; i < numberOfUserBookings; i++ ) {
            var thisBooking = userBookingsArray[i];
            out +=      `<tr>
                            <td>${thisBooking.givenname} ${thisBooking.lastname}</td>
                            <td>${thisBooking.userID}</td>
                            <td>${thisBooking.cargoSpace}</td>
                            <td>${thisBooking.seatSpace}</td>
                            <td>${thisBooking.comments}</td>
                        </tr>`;
        }

        out +=      `</table>`;
    }

    out += `</div>`;
    return out;
}

async function bookingStatsCard (sColSpan, lColSpan, bookingStats, out ) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>Booking Stats</h5>
                <table>
                    <tr>
                        <th> </th>
                        <th>Cargo Space (m3)</th>
                        <th>Seat Space</th>
                    </tr>
                    <tr>
                        <td><b>Trip Capacity</b></td>
                        <td>${bookingStats.tripTotalCargoSpace}</td>
                        <td>${bookingStats.tripTotalSeatSpace}</td>
                    </tr>
                    <tr>
                        <td><b>Space Booked</b></td>
                        <td>${bookingStats.totalBookedCargo}</td>
                        <td>${bookingStats.totalBookedSeats}</td>
                    </tr>
                    <tr>
                        <td><b>Space Remaining</b></td>
                        <td>${bookingStats.remainingCargo}</td>
                        <td>${bookingStats.remainingSeats}</td>
                    </tr>
                    <tr>
                        <td><b>% Utilised</b></td>
                        <td style="font-size:14pt"><b>${bookingStats.percentageUtilizedCargoSpace}%</b></td>
                        <td style="font-size:14pt"><b>${bookingStats.percentageUtilizedSeatSpace}%</b></td>
                    </tr>
                </table> 
            <div>`;
    return out;
}

async function myTripBookingsCard (sColSpan, lColSpan, tripBookingsArray, out ) {
    var numberOfTripBookings = tripBookingsArray.length;

    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>My Bookings</h5>`

    
    out +=      `<p>You have <b>${numberOfTripBookings}</b> trip bookings.</p>`;

    if (numberOfTripBookings > 0) {
    
        out +=      `<table>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                            <th>My Cargo Space</th>
                            <th>My Seat Space</th>
                            <th>Link</th>
                        </tr>`;

        for ( var i = 0; i < numberOfTripBookings; i++ ) {
            var thisBooking = tripBookingsArray[i];
            out +=      `<tr>
                            <td>${thisBooking.tripLinkedtoThisBooking.fromSuburb}</td>
                            <td>${thisBooking.tripLinkedtoThisBooking.toSuburb}</td>
                            <td>${thisBooking.dateJSON.dateString}</td>
                            <td>${thisBooking.userBookingWithNames.cargoSpace}</td>
                            <td>${thisBooking.userBookingWithNames.seatSpace}</td>
                            <td>
                                <form method="GET" action="/booking${thisBooking.viewBookingDetailsURL}">
                                    <button class="btn waves-effect waves-light light-green darken-3" type="submit" name="action">View</button>
                                </form>
                            </td>
                        </tr>`;
        }

        out +=      `</table>`;
    }

    out += `</div>`;
    return out;
}

async function bookingCommentsCard(sColSpan, lColSpan, bookingComments, out ) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>My Booking Comments</h5>
                <p>${bookingComments}</p>
                
            </div>`;
    return out;
}

async function userViewBookingStatsCard (sColSpan, lColSpan, bookingStats, out ) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>Booking Stats</h5>
                <table>
                    <tr>
                        <th> </th>
                        <th>Cargo Space (m3)</th>
                        <th>Seat Space</th>
                    </tr>
                    <tr>
                        <td><b>Trip Capacity</b></td>
                        <td>${bookingStats.tripTotalCargoSpace}</td>
                        <td>${bookingStats.tripTotalSeatSpace}</td>
                    </tr>
                    <tr>
                        <td><b>Space Booked by Me</b></td>
                        <td>${bookingStats.myCargo}</td>
                        <td>${bookingStats.mySeats}</td>
                    </tr>
                    <tr>
                        <td><b>Space Booked by Other Users</b></td>
                        <td>${bookingStats.otherUsersCargoTotal}</td>
                        <td>${bookingStats.otherUsersSeatsTotal}</td>
                    </tr>
                    <tr>
                        <td><b>Space Remaining</b></td>
                        <td>${bookingStats.remainingCargo}</td>
                        <td>${bookingStats.remainingSeats}</td>
                    </tr>
                    <tr>
                        <td><b>% Utilised</b></td>
                        <td style="font-size:14pt"><b>${bookingStats.percentageUtilizedCargoSpace}%</b></td>
                        <td style="font-size:14pt"><b>${bookingStats.percentageUtilizedSeatSpace}%</b></td>
                    </tr>
                </table> 
            <div>`;
    return out;
}

async function driverInfoCard( sColSpan, lColSpan, driverInfo, out ) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>Driver Info</h5>
                <table>
                    <tr> 
                        <td><b> Username </b></td> 
                        <td> ${ driverInfo.username } </td> 
                    </tr>
                    <tr> 
                        <td><b> Name </b></td> 
                        <td> ${ driverInfo.givenname } ${ driverInfo.lastname } </td> 
                    </tr>
                    <tr> 
                        <td><b> Age </b></td> 
                        <td> ${ driverInfo.age } </td> 
                    </tr>
                    <tr> 
                        <td><b> Gender </b></td> 
                        <td> ${ driverInfo.gender } </td> 
                    </tr>                                  
                </table>
            </div>`;
    return out;
}

async function openingHtmlElements(out) {
    out += `<main>
                <div class="container">`;
    return out;
}

async function closingHtmlElements(out) {
    out += `    </div>
            </main>`;
    return out;
}

async function addSpacerColumn(dividingSpace, out) {
    out += `<div class="col s${dividingSpace} l${dividingSpace}">
            </div>`;
    return out;
}

async function addPageTitle(sColSpan, lColSpan, pageTitle, out) {
    out += `<div class="row">
                <div class="col s${sColSpan} l${lColSpan} white-text blue-grey darken-3 z-depth-1">
                    <h3>${pageTitle}</h3>
                </div>
            </div>`;
    return out;
}

module.exports = {
    addHeaderHTML,
    addFooterHTML,
    welcomeBackCard,
	thankYouCard,
    profileInfoCard,
    driverHomepageCard,
    driverRegistrationFormCard,
    driverTripsCard,
    openingHtmlElements,
    closingHtmlElements,
    addSpacerColumn,
    tripDetailsCard,
    userBookingsCard,
    bookingStatsCard,
    myTripBookingsCard,
    bookingCommentsCard,
    userViewBookingStatsCard,
    driverInfoCard,
    addPageTitle
};