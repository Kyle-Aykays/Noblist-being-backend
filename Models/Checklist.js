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
            completed: {
                type: String, 
                required : true
            }, 
            note: {
                type: String, 
                default: ''
            },
        },
    ], 
    checklistType: {
        type: String,
        enum: ['Morning', 'LateMorning', 'Afternoon', 'Evening','Night'],
        required: true,
      },
      
})

module.exports = mongoose.model('checklist', checklistScehema)