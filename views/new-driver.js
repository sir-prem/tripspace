
let U = require('./utilities');
var out;

async function displayNewDriverPage(res) {
    
    out = ``;
    console.log('> displayNewDriverPage: method entered...');
    
    out = await U.addHeaderHTML(out);

    out += '<main>';
    out += '  <div class="container">';

    out += '    <div class="row">';
    out =           await U.driverRegistrationFormCard( 12, 5, out );
    out += '    </div>';
    
    out += '</main>';


    
    out = await U.addFooterHTML(out);
    
    res.send(out);
}

module.exports = {
    displayNewDriverPage
}
