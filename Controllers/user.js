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
                
                var result = '';                
                try {
                    result = await UserModel.findOne( { username: reqUsername }, { __v:0 } );                    
                    console.log(result);

                    if (result == null) { // Invalid username
                        res.send('Username not found');
                    }
                    else { // Valid username

                        if (reqPassword == result.password) { // Valid password
                            //res.send('Username found AND Password MATCH. User authenticated.');
                            await UserView.displayUserProfilePage(res, result);
                        }
                        else { // Invalid password
                            res.send('Username found. Invalid Password.');
                        }

                    }
                    //await UserView.displayUserProfilePage(res, result);
                } catch (error) {
                    console.log(error.message);
                }
                
            }

};