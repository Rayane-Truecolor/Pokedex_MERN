const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true,
    },
    hp: {
        type: Number,
        required: true,
    },
    cp: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    types: {
        type: [String],
        required: true,
    },
   
    
});

module.exports = mongoose.model('Workout', workoutSchema);