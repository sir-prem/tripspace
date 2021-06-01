const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/user');

router.post('/', UserController.editProfile);

module.exports = router;