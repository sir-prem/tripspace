let U = require('../Views/utilities');
var out;

async function displayUserProfilePage(res, user, url, buttonTitle) {
    out = ``;
    console.log('> displayUserProfilePage: method entered...');
    console.log('_id is: ' + user._id);
    
    out = await U.addHeaderHTML(out);
    
    console.log("username is: " + user.username);

    //out += result;

    out += '<main>';
    out += '  <div class="container">';

    out += '    <div class="row">';
    out =           await U.welcomeBackCard( 12, 5, user.username, out );
    out += '    </div>';
    
    out += '    <div class="row">';
    out =           await U.profileInfoCard( 12, 5, user, out );
    out += '    </div>';

    out += '    <div class="row">';
    out +=          `<form method="GET" action="${url}">
                        <button class="btn waves-effect waves-light light-green darken-3" type="submit" name="action">${buttonTitle}</button>
                    </form>`;
    out += '    </div>';
    out += '  </div>';
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
    out += '  <div class="container col s12 l4 grey lighten-5 z-depth-1">';
    out += '	    <h5>Edit profile</h5>';
    out += '	    <form method="POST" action="/user-profile" id="addtrip">';
    out += '            Username:' + user.username + '<br><br>';
    out += '            Given Name: <input type="text" value="'+ user.givenname +'" name="givenname" /><br>';
    out += '            Last Name: <input type="text" value="'+ user.lastname +'" id="tripDate" name="lastname"><br>';
    out += '            Age: <input type="text" value="'+ user.age +'" id="startTime" name="age"><br>';
    out += '            Gender: <input type="text" value="'+ user.gender +'" id="endTime" name="gender"><br>';
    out += '            Password: <input type="text" value="" id="endTime" name="password"><br>';
    out += '            Profile picture: (Image should be smaller than 16MB)</br>';
	out += '			<input type="file" id="profile_pic_src"/></br>';
	out += '			<input type="text" name="profile_pic" id="real_image" style="display: none;"/>';
	out += '			<img id="profile_pic" width="100" height="100" src="' + user.profile_pic + '"></br></br>';
    out += '            <input type="hidden" name="username" value=' + user.username + '>';
    out += '            <input type="hidden" name="sourcepage" value="editProfile" >';
    out += '	        <button class="btn waves-effect waves-light" type="submit" name="action">Update</button>';
    out += '	        <button class="btn waves-effect waves-light" type="submit" name="action">Cancel</button>';
    out += '	    </form>';
    out += '  </div>';
    out += '</main>';


    
    out = await U.addFooterHTML(out);

    res.send(out);
}

async function displayRegistrationCompletePage(res, result) {
    out = ``;
    console.log('> displayRegistrationCompletePage: method entered...');

    out = await U.addHeaderHTML(out);
    
    console.log("username is: " + result.username);

    //out += result;

    out += '<main>';
    out += '  <div class="container">';

    out += '    <div class="row">';
    out =           await U.thankYouCard( 12, 5, result.givenname, out );
    out += '    </div>';
    
    out += '    <div class="row">';
    out =           await U.profileInfoCard( 12, 5, result, out );
    out += '    </div>';
    out += '</main>';


    
    out = await U.addFooterHTML(out);

    res.send(out);
}

module.exports = {
    displayUserProfilePage,
    displayRegistrationCompletePage,
    displayEditUserProfilePage
}


