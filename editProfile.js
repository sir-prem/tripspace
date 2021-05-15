let express = require('express')
var router = express.Router();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://admin:00000@cluster0.7hvms.mongodb.net/test";

let U = require("./utilities.js");

var out;
var user = "";
var givenname;
var lastname;
var age;
var gender;
var profile_pic;
var password
var addTrip; // flag to add new trip to database

router.post('/', async function(req, res){
	
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    out = "";
    user = req.body.username;
    givenname = req.body.givenname;
    lastname = req.body.lastname;
    age = req.body.age;
    password = req.body.password;
    gender = req.body.gender;
    

    userDoc = await U.retrieveUserDoc(user);
    userType = userDoc.usertype;
    console.log("back: userType is: " + userType);

    addTrip = req.body.addNew;
    profile_pic = req.body.profile_pic;

    console.log("username value is: " + user);
    console.log("addTrip value is: " + addTrip);
        
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        //firstly, if a new trip was just submitted (in prev route call), update database

        
        out = await U.addHeaderHTML(out);
        
        out += '	<div class="container">';
        out += '		<div class="row">';
        
                            //content

                            // await showTripSchedule(client);

        out += `        </div>`;

        out += `        <div class="row">`;
        
                            await showNewTripForm();

        out += '            <div class="col s12 l1"></div>'; //empty div for spacing between columns


                        out = await U.backToProfilePageButton(out,user);
        
        out += `        </div>`;
    
        
        out+= '     </div>'; // end container div

        out = await U.addFooterHTML(out);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
	res.send(out);
    

});

async function showNewTripForm() {
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
    out += '    <div class="col s12 l4 grey lighten-5 z-depth-1">';
    out += '	    <h5>Edit profile</h5>';
    out += '	    <form method="POST" action="/user-profile" id="addtrip">';
    out += '            Username:' + user + '<br><br>';
    out += '            Given Name: <input type="text" value="'+ givenname +'" name="givenname" /><br>';
    out += '            Last Name: <input type="text" value="'+ lastname +'" id="tripDate" name="lastname"><br>';
    out += '            Age: <input type="text" value="'+ age +'" id="startTime" name="age"><br>';
    out += '            Gender: <input type="text" value="'+ gender +'" id="endTime" name="gender"><br>';
    out += '            Password: <input type="text" value="'+ password +'"id="endTime" name="password"><br>';
    out += '            Profile picture: (Image should be smaller than 16MB)</br>';
	out += '			<input type="file" id="profile_pic_src"/></br>';
	out += '			<input type="text" name="profile_pic" id="real_image" style="display: none;"/>';
	out += '			<img id="profile_pic" width="100" height="100" src="' + profile_pic + '"></br></br>';
    out += '            <input type="hidden" name="username" value=' + user + '>';
    out += '            <input type="hidden" name="sourcepage" value="editProfile" >';
    out += '	        <button class="btn waves-effect waves-light" type="submit" name="action">Update</button>';
    out += '	    </form>';
    out += '    </div>';
}

//export this router to use in our index.js
module.exports = router;
