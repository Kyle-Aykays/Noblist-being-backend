const { required } = require('joi');
const mongoose = require('mongoose');

const checklistScehema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    date:{
        type: Date, 
        required: true,
        default: Date.now
    },
    items: [
        {
            name: {
                type : String, 
                required: true
            },
            completed: { type: Boolean, default: false }, 
            note: {
                type: String, 
                default: ''
            },
            streak: {
                type: Number, 
                default: 0
            }, 
            priority: {
                type: String, 
                enum : ['high', 'low','medium', ''], 
                default: ''
            },
             
            rescheduledFrom: { type: Date, default: null } // Tracks the date the task was rescheduled from

        },
    ], 
    checklistType: {
        type: String,
        enum: ['Morning', 'LateMorning', 'Afternoon', 'Evening','Night'],
        required: true,
      },
      
}, {timestamps: true})

module.exports = mongoose.model('checklist', checklistScehema)