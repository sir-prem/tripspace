const express = require('express');
const router = express.Router();

const User = require('../Models/user')
const UserController = require('../Controllers/user');



router.get('/', UserController.getAllUsers);


router.get('/:id', UserController.getUserByID);

// User attempt to login
router.post('/auth', UserController.authenticateUser);


// New user registration
router.post('/', UserController.userRegistration);


router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await User.findOneAndDelete( { _id: id });
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const result = await User.findOneAndUpdate( { _id: id }, 
                { $set: updates}, { new:true } );
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;