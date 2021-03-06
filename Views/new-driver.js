
let U = require('./utilities');
var out;

async function displayNewDriverPage(res) {

    const heading = `Driver Sign-Up`;
    const subheading = `Start earning an <b>extra income</b>, and <b>helping the environment</b>
	                    by utilising spare space in your vehicle. 
                        <p>Register your details with us, and get started right now!</p>`;
    const usertype = `driver`;
    
    out = ``;
    console.log('> displayNewDriverPage: method entered...');
    
    out = await U.addHeaderHTML(out);

    out += '<main>';

    out = await U.addPageTitle(12, 12, "Registration", out);

    out += '    <div class="row">';
    out =           await U.regForm( 12, 5, heading, subheading, usertype, out );
    out += '    </div>';
    
    out += '</main>';


    
    out = await U.addFooterHTML(out);
    
    res.send(out);
}

module.exports = {
    displayNewDriverPage
}
