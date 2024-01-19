const Workout = require('../models/workoutModel.js');
const mongoose = require('mongoose');
// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single workout
const getWorkout = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout exists' });
   }

   
   const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout exists' });
    }
    res.status(200).json(workout);
}

// Create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    try {
        const workout = await Workout.create({ title, load, reps });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const {id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout exists' });
    }

    const workout = await Workout.findByIdAndDelete({_id: id});

    if (!workout) {
        return res.status(404).json({ error: 'No such workout exists' });
    }

    res.status(200).json(workout);
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout exists' });
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    if (!workout) {
        return res.status(404).json({ error: 'No such workout exists' });
    }

    res.status(200).json(workout);
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
