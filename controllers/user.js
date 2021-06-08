const UserModel = require('../Models/user');
let UserView = require('../Views/user-profile');
let Util = require('../Controllers/utilities');

module.exports = {
    edit:
    async (req, res, next) => {
        try {
            console.log("The body is: " + JSON.stringify(req.body));
            console.log("The id is: " + req.body.uid);
            var p = req.body.profile_pic;
            var result;
            if (p == "") {
                result = await UserModel.findOneAndUpdate( {_id: req.body.uid}, {$set:{
                    password: req.body.password,
                    givenname: req.body.givenname,
                    lastname: req.body.lastname,
                    age: req.body.age,
                    gender: req.body.gender,
                }} ); 
        } else {
            result = await UserModel.findOneAndUpdate( {_id: req.body.uid}, {$set:{
                    password: req.body.password,
                    givenname: req.body.givenname,
                    lastname: req.body.lastname,
                    age: req.body.age,
                    gender: req.body.gender,
                    profile_pic: req.body.profile_pic
                }} ); 
        }
        await UserView.displayUserProfilePage(res, result);
        } catch (error) {
            console.log(error.message);
        }
    
    },
    editProfile: 
    async (req, res, next) => {
        try {
            console.log(req.body);
            var result = await UserModel.findOne( {username: req.body.username}, { __v:0 } );
            console.log(result);
            await UserView.displayEditUserProfilePage(res, result);
        } catch (error) {
            console.log(error.message);
        }
    
    },
    getAllUsers: 
            async (req, res, next) => {
                try {
                    const results = await UserModel.find( {}, { __v:0 } );
                    res.send(results);
                } catch (error) {
                    console.log(error.message);
                }
            
            },
    getUserByID:
            async (req, res, next) => {
                Util.consoleLogHeader("get User By ID");
                const id = req.params.id;

                console.log("id is: " + id);
                var user = '';
                try {
                    if (id.match(/^[0-9a-fA-F]{24}$/)) {
                        console.log("YO YO here");
                        user = await UserModel.findOne( { _id: id }, { __v:0 } );
                    }
                    else { // by username
                        user = await UserModel.findOne( { username: id }, { __v:0 } );
                    }
                    
                    console.log(user);
                    if (user.usertype == 'driver') {
                        await UserView.driverProfile(res, user);
                    }
                    else { // usertype is 'user'
                        await UserView.userProfile(res, user);                                
                    }
                } catch (error) {
                    console.log(error.message);
                }
            },
    authenticateUser:
            async (req, res, next) => {
                console.log('---------------------');
                console.log("> authenticateUser method...")
                console.log("req.body is: ");
                console.log(req.body);
                
                const reqUsername = req.body.username;
                const reqPassword = req.body.password;

                console.log('reqUsername is: ' + reqUsername);
                console.log('reqPassword is: ' + reqPassword);
                console.log('req.headers content-type is: ' + req.headers['content-type']);
                
                var user = '';                
                try {
                    user = await UserModel.findOne( { username: reqUsername }, { __v:0 } );                    
                    console.log(user);

                    if (user == null) { // Invalid username
                        res.send('Username not found');
                    }
                    else { // Valid username

                        if (reqPassword == user.password) { // Valid password
                            //res.send('Username found AND Password MATCH. User authenticated.');
                            
                            if (user.usertype == 'driver') {
                                await UserView.driverProfile(res, user);
                            }
                            else { // usertype is 'user'
                                await UserView.userProfile(res, user);                                
                            }
                        }
                        else { // Invalid password
                            res.send('Username found. Invalid Password.');
                        }

                    }
                    //await UserView.displayUserProfilePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
                
            },
    userRegistration:
            async (req,res,next) => {

                try {
                    const newUser = new UserModel(req.body);
                    const result = await newUser.save();        
                    await UserView.regComplete(res, result);
                } catch (error) {
                    console.log(error.message);
                }
            
            }

};