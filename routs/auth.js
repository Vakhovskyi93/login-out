const express = require('express');
const router = express.Router();
const controler = require('../controles/auth')
const passport = require('passport')

// http://localhost:5000/api/auth/login
router.post('/login', controler.login)
// http://localhost:5000/api/auth/users
router.post('/users',passport.authenticate('jwt', {session: false}) ,  controler.users)
// http://localhost:5000/api/auth/register
router.post('/register', controler.register)

module.exports = router;
