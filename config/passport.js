const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User'); // Import User model
const Checklist = require('../Models/Checklist');
const predefinedChecklists = require('../utils/checklistTemplates');
const UserModel = require('../Models/User');

// Replace with your Google OAuth credentials
const GOOGLE_CLIENT_ID = '99949656590-rl352den1662grl5a1sq2rr971dhgege.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find or create the user in the database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                accessToken: accessToken,
                refreshToken: refreshToken,
                scopes: ['openid', 'email', 'profile'],
                 // Modify dynamically if needed
            });

            // Create predefined checklists for the new user
       for (const checklistTemplate of predefinedChecklists) {
        const newChecklist = new Checklist({
            user: user._id,
            checklistType: checklistTemplate.checklistType,
            items: checklistTemplate.items,
        });
        await newChecklist.save();
        
    }
        }else {
            // Update tokens for existing Google user
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
