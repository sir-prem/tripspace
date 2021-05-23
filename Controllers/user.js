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
            }

};