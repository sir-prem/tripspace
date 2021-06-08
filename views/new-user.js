let U = require('./utilities');
var out;

async function displayNewUserPage(res) {

    const heading = `User Sign-Up`;
    const subheading = `Enjoy <b>discounted rides</b> and <b>courier services</b>. Search your required route, 
                        and book cargo space or seat space (or both) on a trip instantly, it's <b>super easy</b>!
                        <p>Register your details with us, and get started right now!</p>`;
    const usertype = `user`;
    
    out = ``;
    console.log('> displayNewUserPage: method entered...');
    
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
    displayNewUserPage
}