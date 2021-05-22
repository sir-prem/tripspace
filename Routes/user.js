const express = require('express');
const router = express.Router();

const User = require('../Models/user')

router.post('/', async (req,res,next) => {

    try {
        const newUser = new User(req.body);
        const result = await newUser.save();        
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }

});

module.exports = router;