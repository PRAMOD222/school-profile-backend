const express = require('express');
const { signupUser, loginUser, getUsers } = require('../controllers/userController');
const router = express.Router();

// Signup route
router.post('/signup', signupUser);

// Login route
router.post('/login', loginUser);

router.get('/allusers', getUsers);



module.exports = router;
