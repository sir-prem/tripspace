let U = require('../Views/utilities');
let ctrlUtil = require('../Controllers/utilities');
let BookingController = require('../Controllers/booking');
var out;

async function userProfile(res, user) {
    ctrlUtil.consoleLogHeader('userProfile');
    out = ``;
    var array = await BookingController.getBookingsByUser(user.username);

    console.log('_id is: ' + user._id);
    console.log("username is: " + user.username);
    
    out = await U.addHeaderHTML(out);
    

    out += '<main>';
    out = await U.addPageTitle(12, 12, "User Profile", out);
    
    out += `    <div class="row" id="red-border">

    
                    <div class="col s12 l1" id="green-border"><p>SPACER</p></div>

                    <div class="col s12 l3" id="green-border">

                        <div class="row grey lighten-5 z-depth-1">`;

                            out =           await U.profileInfoCard( user, out );


    out +=              `</div>
                    
                        <div class="row">

                            <p>blah blah</p>
                        </div>
                    
                    
                    
                    </div>
                    
                    <div class="col s12 l7" id="green-border" style="padding-left:2%;">
                    
                        <div class="row">`;

                            
                            out =       await U.myTripBookingsCard( 12, 12, array, out);
    out +=              `</div>

                        <div class="row">
                            <p>blah blah</p>

                        </div>

                        <div class="row">
                            <p>blah blah</p>

                        </div>
                    
                    
                    
                    </div>
                    
                    <div class="col s12 l1" id="green-border"><p>SPACER</p></div>`; 

                    

    
    
    
    
    
    out += '    </div>';




    out += '    <div class="row">';
    out +=          `<form method="GET" action="/">
                        <button class="btn waves-effect waves-light light-green darken-3" type="submit" name="action">blah</button>
                    </form>`;
    out += '    </div>';
    
    out += '</main>';


    
    out = await U.addFooterHTML(out);

    res.send(out);
}

async function displayEditUserProfilePage(res, user) {
    out = ``;
    console.log('> displayUserProfilePage: method entered...');
    console.log('_id is: ' + user._id);
    
    out = await U.addHeaderHTML(out);
    
    console.log("username is: " + user.username);

    //out += result;
    out += '<main>';
    out += `
    <script>
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
    `;
    out += '  <div class="container col s12 l4 grey lighten-5 z-depth-1" style="width:400px">';
    out += ' <div style ="padding-top: 25px;padding-right: 25px;padding-bottom: 25px;padding-left: 25px;" >'
    out += '	    <h5>Edit profile</h5>';
    out += '	    <form method="POST" action="/editProfile/edit" id="edit">';
    out += '            <input type="hidden" name="uid" value=' + user._id + '>';
    out += '            Username:' + user.username + '<br><br>';
    out += '            Given Name: <input type="text" value="'+ user.givenname +'" name="givenname" /><br>';
    out += '            Last Name: <input type="text" value="'+ user.lastname +'" id="tripDate" name="lastname"><br>';
    out += '            Age: <input type="text" value="'+ user.age +'" id="startTime" name="age"><br>';
    out += '            Gender: <input type="text" value="'+ user.gender +'" id="endTime" name="gender"><br>';
    out += '            Password: <input type="password" value="'+user.password+'" id="endTime" name="password"><br>';
    out += '            Profile picture: (Image should be smaller than 16MB)</br>';
	out += '			<input type="file" id="profile_pic_src"/></br>';
	out += '			<input type="text" name="profile_pic" id="real_image" style="display: none;"/>';
	out += '			<img id="profile_pic" width="100" height="100" src="' + user.profile_pic + '"></br></br>';
    out += '            <input type="hidden" name="username" value=' + user.username + '>';
    out += '            <input type="hidden" name="sourcepage" value="editProfile" >';
    out += '	        <button class="btn waves-effect waves-light" type="submit" name="action">Update</button>';
    out += '<form>'
    out += '	        <input style="color: white;" class="btn" type="button" value="Cancel" onclick="history.go(-1)">';
    out += '</form>'
    out += '	    </form>';
    out += '</div';
    out += '  </div>';
    out += '</main>';


    
    out = await U.addFooterHTML(out);

    res.send(out);
}

async function regComplete(res, user) {
    out = ``;
    console.log('> regComplete: method entered...');

    out = await U.addHeaderHTML(out);
    
    console.log("username is: " + user.username);

    //out += user;

    out += '<main>';

    out = await U.addPageTitle(12, 12, "Thanks", out);

    out += '    <div class="row">';
    out =           await U.thankYouCard( user, out );
    out += '    </div>';
    
    out += '</main>';


    
    out = await U.addFooterHTML(out);

    res.send(out);
}

module.exports = {
    userProfile,
    regComplete,
    displayEditUserProfilePage
}


