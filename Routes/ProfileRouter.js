const express = require('express');
const { getUserProfile, updateUserProfile } = require('../Controllers/ProfileController');
// const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get user profile
router.post('/getprofile', getUserProfile);

// Route to update user profile
router.put('/updateProfile', updateUserProfile);

module.exports = router;
