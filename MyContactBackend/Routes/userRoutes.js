const express = require('express');
const { registerUser, loginUser, currentUser } = require('../Controllers/userControllers');
const { validateToken } = require('../Middleware/validateTokenHandlers');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/current').get(validateToken, currentUser);

module.exports = router;