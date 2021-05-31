const UserModel = require('../Models/user');
let UserView = require('../Views/user-profile');

module.exports = {

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
                const id = req.params.id;
                console.log("id is: " + id);
                var result = '';
                try {
                    if (id.match(/^[0-9a-fA-F]{24}$/)) {
                        result = await UserModel.findOne( { _id: id }, { __v:0 } );
                    }
                    console.log(result);
                    await UserView.displayUserProfilePage(res, result);
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
                            var url;
                            var buttonTitle;
                            if (user.usertype == 'driver') {
                                url = `/trip/driver/${user.username}`;
                                buttonTitle = `My Trips`;
                            }
                            else { // usertype is 'user'
                                url = `/booking/user/${user.username}`;
                                buttonTitle = `My Bookings`;
                            }
                            await UserView.displayUserProfilePage(res, user, url, buttonTitle);
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
                    await UserView.displayRegistrationCompletePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
            
            }

};