
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
	out += '    			<li><a href="/">Home</a></li>';
	out += '    			<li><a href="./about.html">About</a></li>';
	out += '    			<li><a href="./contact.html">Contact</a></li>';
    out += '    			<li><a href="./track_driver.html">Track Driver</a></li>';
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

async function signUpCard(sColSpan, lColSpan, heading, subheading, para, href, out) {
    out += `<div class="col s${sColSpan} l${lColSpan} card" style="background-color: lightgrey;">
                <h6><b>${heading}:</b></h6>
                <h4>${subheading}</h4>
                <p>${para}</p>
                <p><a href="${href}" class="waves-effect waves-light light-green darken-1 btn">Sign Up</a></p>
            </div>`;
    return out;
}

async function regForm(sColSpan, lColSpan, heading, subheading, usertype, out) {
    out += `<script>
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
            </script>
            <div class="col l1"></div>
            <div class="col s12 l3" style="background-color: lightgrey;">
                <h3>${heading}</h3>
                <h5>${subheading}</h5>
                <p>Not sure and want to know a bit more before you begin your journey with 
                TripSpace? Click here to find out more...<br><br>
                <a href="./how-tripspace-works.html" class="waves-effect waves-light btn light-green darken-1">Find out more</a>
            </div>            
            <div class="col s5 l5" style="background-color: slategrey; color: white; padding-left:2%;">
                <h4>Register here</h4>
                <p>Please fill in the below details.</p>
                <form method="POST" action="/user">
                    <p>username: <input type="text" name="username" /></p>
                    <p>password: <input type="text" name="password" /></p>
                    <p>Given name: <input type="text" name="givenname" /></p> 
                    <p>Last name: <input type="text" name="lastname" /></p> 
                    <p>Age: <input type="text" name="age" /></p> 
                    <p>Gender: <input type="text" name="gender" /></p> 
                    <p>Profile picture: (Image should be smaller than 16MB)</p>
                    <input type='file' id="profile_pic_src"/></br>
                    <input type='text' name="profile_pic" id="real_image" style="display: none;"/>
                    <img id="profile_pic" width="100" height="100" src="/images/blank_profile.png"></br></br>
                    <input type="hidden" name="usertype" value="${usertype}"/>
                    <button class="btn waves-effect waves-light light-green darken-1" type="submit" name="action">Submit
                        </button>
                </form>
            </div>
            
            <div class="col s5 l2" style="padding-left:2%;">`;
            if (usertype == 'user') {
                out+= ` <div class="row"><img src="/images/pic15.png" width="100%"/></div>
                        <div class="row"><img src="/images/pic25.png" width="100%"/></div>
                        <div class="row"><img src="/images/pic13.png" width="100%"/></div>`;
            }
            else { // driver
                out+= ` <div class="row"><img src="/images/pic7.png" width="100%"/></div>
                        <div class="row"><img src="/images/pic20.png" width="100%"/></div>
                        <div class="row"><img src="/images/pic19.png" width="100%"/></div>`;
            }

                
    out+= ` </div>
            <div class="col l1"></div>`;
    return out;
}

async function welcomeBackCard(sColSpan, lColSpan, givenname, out) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<h4>Welcome back, <b>' + givenname + '</b></h4>';
    out += '</div>';
    return out;
}

async function thankYouCard(user, out) {
    out += `<div class="col l2"></div>
            <div class="col s12 l3 grey lighten-5 z-depth-1">
                <img src="/images/pic23.png" width="100%"/>
            </div>
            <div class="col s12 l4 grey lighten-5 z-depth-1">
                <h4>Thanks for registering, <b>${user.givenname}</b></h4>
                <p>You are now a registered <b>${user.usertype}</b> for TripSpace. We hope you will 
                have a great time here, as part of our small cause towards a greener sustainable future.</p>
                <p>Please click below to proceed to your Profile page and start your rewarding journey 
                with TripSpace...</p>
                <p>
                    <form method="GET" action="/user/${user.username}">                
                        <button class="btn waves-effect waves-light light-green darken-1" 
                                    type="submit" name="action" style="margin-left:70%;">My Profile</button>
                    </form>
                </p>
            </div>
            <div class="col l3"></div>`;
    return out;
}

async function profileInfoCard(result, out) {

    out += `<div class="col s12 l6 grey lighten-5">
                <h5>My Profile</h5>
                <table>
                    <tr><td><b>Username</b></td><td>${result.username}</td></tr>
                    <tr><td><b>Given name</b></td><td>${result.givenname}</td></tr>
                    <tr><td><b>Last name</b></td><td>${result.lastname}</td></tr>
                    <tr><td><b>age</b></td><td>${result.age}</td></tr>
                    <tr><td><b>gender</b></td><td>${result.gender}</td></tr>
                </table>
                <form method="POST" action="/editProfile">
                    <input type="hidden" name="username" value=${result.username}>
                    <input type="hidden" name="givenname" value=${result.givenname}>
                    <input type="hidden" name="lastname" value=${result.lastname}>
                    <input type="hidden" name="age" value=${result.age}>
                    <input type="hidden" name="gender" value=${result.gender}>
                    <input type="hidden" name="profile_pic" value=${result.profile_pic}>
                    <input type="hidden" name="password" value=${result.password}>
                    <input type="hidden" name="addNew" value="false">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Edit</button>
                </form>
            </div>
            <div class="col s4 l4 grey lighten-5" style="padding-top: 10%; margin-left:10%;">`;

	if (result.gender=="Male") {
		out +=	`<img src="${result.profile_pic}" width=100% style="border:1px solid red;" />`;
	}
	else {
		out +=	`<img src="${result.profile_pic}" width=100% style="border:1px solid red;" />`;
	}

	out +=	'</div>';
    return out;
}

async function driverTripsCard( sColSpan, lColSpan, array, driverUsername, out ) {
    
    const numberOfDriverTrips = array.length;
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>My Upcoming Trips</h5>
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
                                <button class="btn waves-effect waves-light light-green darken-3" type="submit">View</button>
                            </form>
                        </td>
                    </tr>`;
                }

    out +=      `</table>
                <p>
                    <form method="GET" action="/trip/add/${driverUsername}">
                        <button class="btn waves-effect waves-light light-green darken-3" type="submit" style="margin-left:45%;">[+] Add New Trip</button>
                    </form>
                </p>
            </div>`;
    return out;
}

async function tripDetailsCard( sColSpan, lColSpan, driverTrip, dateString, out ) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>Trip Info</h5>
                <table>                    
                    <tr> 
                        <td><b> From </b></td> 
                        <td> ${ driverTrip.fromSuburb } </td> 
                        <td><b> To </b></td> 
                        <td> ${ driverTrip.toSuburb } </td>
                    </tr>                    
                    <tr> 
                        <td><b> Date </b></td> 
                        <td> ${ dateString } </td> 
                    </tr>
                    <tr> 
                        <td><b> Dep: </b></td> 
                        <td> ${ driverTrip.departureTime } </td> 
                        <td><b> Arr: </b></td> 
                        <td> ${ driverTrip.arrivalTime } </td> 
                    </tr>                    
                    <tr> 
                        <td><b> Vehicle </b></td> 
                        <td> ${ driverTrip.vehicle } </td> 
                    </tr>
                    <tr> 
                        <td><b> Cargo Capacity </b></td> 
                        <td> ${ driverTrip.cargoSpace } </td> 
                        <td><b> Seat Capacity </b></td> 
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
                <h5>Upcoming Bookings</h5>`

    
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

async function driverInfoCard( sColSpan, lColSpan, driver, out ) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">
                <h5>Driver Info</h5>
                <table>                    
                    <tr> 
                        <td><b> Name: </b></td> 
                        <td> ${ driver.givenname } ${ driver.lastname } </td> 
                        <td><b> Age: </b></td> 
                        <td> ${ driver.age } </td> 
                        <td><b> Gender: </b></td> 
                        <td> ${ driver.gender } </td> 
                    </tr>
                    <tr>                          
                        <td><img src="${ driver.profile_pic }" width="100%" style="margin-left:120%;" /> </td> 
                    </tr>                                  
                </table>
            </div>`;
    return out;
}

async function openingHtmlElements(out) {
    out += `<main>`;
    //            <div class="container">`;
    return out;
}

async function closingHtmlElements(out) {
    //out += `    </div>`;
    out += `        </main>`;
    return out;
}

async function addSpacerColumn(dividingSpace, out) {
    out += `<div class="col s${dividingSpace} l${dividingSpace}">
            </div>`;
    return out;
}

async function addPageTitle(sColSpan, lColSpan, pageTitle, out) {
    out += `<div class="row">
                <div class="col s1 l1"></div>
                <div class="col s1 l1" id="greenblock">
                    <p><br><br><br></p>
                </div>
                <div class="col s10 l10 white-text"><h1>${pageTitle}</h1></div>
            </div>`;

    return out;
}

async function displaySymbolLogo(sColSpan, lColSpan, out) {    
    out += `<div class="col s${sColSpan} l${lColSpan}">
                <img src="/logo-reverse.png" width="250px"/>
                <p class="logo">Utilising unused space on moving vehicles</p>
            </div>`;
    return out;
}

async function loginCard(out) {
    out += `<div class="col s12 l12 grey lighten-5 z-depth-1">
    			<p>Already a member? Then sign in below.</p>
				<h4>Login</h4></p>
				<form method="POST" action="/user/auth">
                    username: <input type="text" name="username" /><br>
                    password: <input type="password" name="password" /><br>
                    <button class="btn waves-effect waves-light light-green darken-1" type="submit" name="action">Submit</button>
				</form>
            </div>`;
    return out;
}

module.exports = {
    addHeaderHTML,
    addFooterHTML,
    welcomeBackCard,
	thankYouCard,
    profileInfoCard,
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
    addPageTitle,
    displaySymbolLogo,
    loginCard,
    signUpCard,
    regForm
};