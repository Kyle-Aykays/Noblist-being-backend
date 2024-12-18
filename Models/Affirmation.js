const mongoose = require('mongoose');

const affirmationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, // Every affirmation must have text
        trim: true, // Removes extra spaces from the beginning and end
    },
    source: {
        type: String,
        enum: ['API', 'User'], // Tracks whether the affirmation is fetched or user-created
        default: 'API', // Default source is an external API
    },
    dateFetched: {
        type: Date,
        default: Date.now, // When the affirmation was added or fetched
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        default: null, // Optional: Only populated if the affirmation is user-specific
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Affirmation', affirmationSchema);
