const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true, // Each activity log belongs to a user
    },
    date: {
        type: Date,
        required: true, // Date of the activity
        default: Date.now, // Defaults to the current date
    },
    activities: [
        {
            name: {
                type: String, // Name of the activity (e.g., "Breakfast", "Workout")
                required: true,
            },
            time: {
                type: Date, // Time of the activity (e.g., "7:00 AM")
                required: true,
            },
            context: {
                type: String, // Context of the activity (e.g., "Home", "Gym")
                default: '',
            },
            feeling: {
                type: String, // Associated feeling (e.g., "Energized", "Relaxed")
                enum: ['Good', 'Great', 'Bad'],
                default: '',
            },
            
        },
    ],
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Activity', activitySchema);
