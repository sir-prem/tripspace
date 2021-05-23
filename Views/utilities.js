
async function addHeaderHTML(out) {
    
    out += '<html>';
	out += '    <head>';
    out += '        <!-- Compiled and minified CSS -->';
    out += '        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
    out += '        <link rel="stylesheet" href="../style.css">';
    out += '        <!-- Compiled and minified JavaScript -->';
    out += '        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>';            
	out += '    </head>';
	out += '    <body>';
	out += '    	  <nav>';
	out += '    		<div class="nav-wrapper brown lighten-4">';
	out += '    		  <a href="#" class="brand-logo"><img src="../logo.png" width="120px"/></a>';
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

async function welcomeBackCard(sColSpan, lColSpan, givenname, out) {
    out += `<div class="col s${sColSpan} l${lColSpan} grey lighten-5 z-depth-1">`;
    out += '	<h4>Welcome back, <b>' + givenname + '</b></h4>';
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
		out +=		   '<img src="../avatar_M.jpeg" width=100% />';
	}
	else {
		out +=		   '<img src="../avatar_F.jpeg" width=100% />';
	}

	out +=	   '</div>';
	out += '</div>';
    return out;
}

module.exports = {
    addHeaderHTML,
    addFooterHTML,
    welcomeBackCard,
    profileInfoCard
};