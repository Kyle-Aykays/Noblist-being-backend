const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, // Each sleep record is associated with a user
    },
    date: {
        type: Date, 
        required: true,
        default: Date.now, // Defaults to the current date if not specified
    },
    sleepTime: {
        type: String, 
        required: true,
    }, 
    wakeupTime: {
        type: String, 
        required: true,
    },
    sleepQuality: {
        type: String, 
        enum: ['Poor', 'Average', 'Good', 'Excellent'], 
        default: 'Average',
    },
    totalHours: {
        type: Number, 
        default: 0, 
    }, 
    numberOfAwakenings: {
        type: Number,
        default: 0,
    },
    reasonForAwakenings: {
        type: String, // Corrected from `string` to `String`
        default: '',
    }, 
    feelingsUponWaking: {
        type: String,
        default: '',
    },
    timeToFallAsleep: {
        type: Number, // Time in minutes
        default: 0,
    },
    reasonForFallingAsleepDelay: {
        type: String,
        default: '',
    },
    alertnessUponWaking: {
        type: String,
        enum: ['Very Alert', 'Alert', 'Neutral', 'Tired', 'Very Tired'],
        default: 'Neutral',
    },
    deepSleepHours: {
        type: Number, // Hours of deep sleep
        default: 0,
    },
    daytimeSleepiness: {
        type: String,
        enum: ['None', 'Mild', 'Moderate', 'Severe'],
        default: 'None',
    },
    sleepingPosition: {
        type: String,
        enum: ['Back', 'Side', 'Stomach', 'Unknown'], // Common sleep positions
        default: 'Unknown',
    },
    windDownActivity: {
        type: String,
        default: '', // What the user did to relax before bed
    },
    totalSteps: {
        type: Number, // Daily step count
        default: 0,
    },
    totalWater: {
        type: Number, // Water intake in liters or milliliters
        default: 0,
    },
    preSleepActivity: {
        type: String,
        default: '', // Activity before sleep (e.g., reading, screen time)
    },
    totalExerciseMinutes: {
        type: Number,
        default: 0,
    },
    bedtimeMedicine: {
        type: String,
        default: '', // Medicine taken before bed
    },
    totalMeditationMinutes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Sleep', sleepSchema);
