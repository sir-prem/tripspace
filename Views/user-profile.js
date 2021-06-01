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
    out += '  <div class="container">';

    out += '    <div class="row">';
    out =           await U.welcomeBackCard( 12, 5, user.username, out );
    out += '    </div>';
    
    out += '    <div class="row">';
    out =           await U.profileInfoCard( 12, 5, user, out );
    out += '    </div>';

    out += '    <div class="row">';
    out +=          `<form method="GET" action="test">
                        <button class="btn waves-effect waves-light light-green darken-3" type="submit" name="action">test</button>
                    </form>`;
    out += '    </div>';
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


