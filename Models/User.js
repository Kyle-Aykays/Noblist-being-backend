const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true, 
        trim: true, // Removes extra spaces

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format validation

    },
    password: {
        type: String,
        required: true, 
        minlenght: 8,
    }, 
    goals: [String], 
    values: [String], 
    mission: {
        type: String, 
        default : ''
    }, 
    vision: {
        type: String, 
        default: ''
    }, 
    // profileSettings: {
    //     theme: {
    //       type: String,
    //       enum: ['light', 'dark'], // Allow only "light" or "dark" themes
    //       default: 'light',
    //     },

    // notifications: {
    //     type: Boolean,
    //     default: true, // Notifications are enabled by default
    //   },
    },
  { timestamps: true })

module.exports = mongoose.model('User', UserSchema);
