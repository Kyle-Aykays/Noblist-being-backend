const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const Checklist = require('../Models/Checklist');
const predefinedChecklists = require('../utils/checklistTemplates');
const UserModel = require('../Models/User');

const router = require('express').Router();

const express = require('express');
const passport = require('passport');

// Redirect to Google login
router.get('/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }));

// Google callback route
// router.get('/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful login, redirect to profile
//         const user = req.user; 
//         console.log(user)
//         res.status(200).json({
//             message: 'Google login successful!',
//             success: true,
//             user: {
//                 id: user._id, // MongoDB ID
//                 name: user.name,
//                 email: user.email,
//             },
//         });
//         // res.redirect('/profile');
        
       
//     }
// );

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful login
        const user = req.user;
        // Redirect to the frontend with user data
        res.redirect(
            `${process.env.FRONTEND_URL}/profile?user=${encodeURIComponent(JSON.stringify({
                id: user._id, // MongoDB ID
                name: user.name,
                email: user.email,
            }))}`
        );
    }
);

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//     // Passport `done` callback will pass the user data here
//     const user = req.user; // This will contain id, name, and email
//     res.status(200).json({
//         message: 'Google login successful!',
//         success: true,
//         user: user,
//     });
// });


// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect('/');
    });
});
router.post('/login',loginValidation, login);
router.post('/signup',signupValidation, signup);
module.exports = router;
