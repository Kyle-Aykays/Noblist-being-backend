const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Every mood entry belongs to a user
    },
    date: {
        type: Date,
        required: true, // Date of the mood log
        default: Date.now, // Defaults to the current date
    },
    situation: {
        type: String, // Brief description of the situation (e.g., "At work meeting")
        default: '',
    },
    triggeredEmotion: {
        type: String, // Emotion triggered by the situation (e.g., "Frustration")
        required: true,
    },
    mood: {
        type: String,
        enum: ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Very Sad'], // Predefined mood options
        required: true,
    },
    action: {
        type: String, // Action taken in response to the mood (e.g., "Went for a walk")
        default: '',
    },
    comments: {
        type: String, // Optional comments or reflections
        default: '',
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Mood', moodSchema);
