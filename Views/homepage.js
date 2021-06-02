
let U = require('./utilities');
var out;

async function displayHomePage(res) {
    
    out = ``;
    console.log('> displayHomePage: method entered...');
    
    out = await U.addHeaderHTML(out);

    out = await U.openingHtmlElements(out);

    out += `<div class="row">`;
    
                //LHS of page
    out +=      `<div class="col s12 l10">`;

            //spacer rows
            out += '    <div class="row"></div>';
            out += '    <div class="row"></div>';
            out += '    <div class="row"></div>';

            out += '    <div class="row">';
            out =           await U.addSpacerColumn(4, out);
            out =           await U.displaySymbolLogo( 12, 4, out );
            out =           await U.addSpacerColumn(4, out);
            out += '    </div>';

            //spacer row
            out += `    <div class="row">
                            
                        </div>`;


            // driver vars
            const headingDriver = "DRIVERS";
            const subheadingDriver = "Got some space?";
            const paraDriver = `Have a vehicle, and do a bit of driving, often with the vehicle empty?
            Want to <b>earn some extra income</b> and do something <b>good for the environment</b> while you drive?
            Then why not sign up now and get started!`;
            const hrefDriver = `./new-driver`;


            // trip user vars
            const headingUser = "TRIP USERS";
            const subheadingUser = "Need some space?";
            const paraUser = `Need to get from A to B at low cost, while receiving <b>great service</b>?
            Or, need to courier small or large items at a <b>fraction of the cost</b>?
            Then why not sign up now and get started!`;
            const hrefUser = `./new-user`;


            out += '    <div class="row">';
            out =           await U.addSpacerColumn(1, out);
            out =           await U.signUpCard( 12, 3, headingDriver, subheadingDriver,
                                                    paraDriver, hrefDriver, out );
            out =           await U.addSpacerColumn(1, out);
            out =           await U.signUpCard( 12, 3, headingUser, subheadingUser,
                                                    paraUser, hrefUser, out );
            out += '    </div>';


    out +=      `</div>`;

                //RHS login column of page
    out +=      `<div class="col s12 l2">`;
    
    out =           await U.loginCard(out);
    out +=      `</div>`;


    out +=  `</div>`;









    
    out = await U.closingHtmlElements(out);
    
    out = await U.addFooterHTML(out);
    
    res.send(out);
}

module.exports = {
    displayHomePage
}
