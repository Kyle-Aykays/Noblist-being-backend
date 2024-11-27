const mongoose = require('mongoose'); 

const energyLogSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }, 
    date: {
        type: Date, 
        required: true, 
        default: Date.now
    }, 
    logs: [
        {
        time: {
            type: String, 
            required : true

        }, 
        energyLevel:{
            type: String, 
            enum: ['very low', 'low', 'Moderate', 'High', 'Very High'] 
            ,
            required: true
        }, 
        activity:{
            type: String, 
            required: true
        }, 
        comments:{
            type: String, 
            required: true
        },
    }
    ],

},{timestamps:true});

module.exports = mongoose.model('Energylog', energyLogSchema)