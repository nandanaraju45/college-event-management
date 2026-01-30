const express = require('express');
const {
    registerUser,
    loginUser,
    registerAdmin,
} = require('../controllers/authController');

const router = express.Router();

// normal users (student, faculty, college_admin)
router.post('/register', registerUser);
router.post('/login', loginUser);

// admin registration (protected by secret)
router.post('/register-admin', registerAdmin);

module.exports = router;
