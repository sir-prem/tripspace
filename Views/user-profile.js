//let express = require('express');

let U = require('./utilities');
var out;

async function displayUserProfilePage(res, result) {
    out = ``;
    console.log('> displayUserProfilePage: method entered...');
    console.log('_id is: ' + result._id);
    
    out = await U.addHeaderHTML(out);
    
    console.log("username is: " + result.username);

    //out += result;

    out += '<main>';
    out += '  <div class="container">';

    out += '    <div class="row">';
    out =           await U.welcomeBackCard( 12, 5, result.username, out );
    out += '    </div>';
    
    out += '    <div class="row">';
    out =           await U.profileInfoCard( 12, 5, result, out );
    out += '    </div>';
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
    displayRegistrationCompletePage
}


