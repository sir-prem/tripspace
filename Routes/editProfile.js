const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/user');

router.post('/', UserController.editProfile);
router.post('/edit', UserController.edit);
router.post('/deleteAccount', UserController.deleteAccount);

module.exports = router;