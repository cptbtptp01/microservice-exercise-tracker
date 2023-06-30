const express = require('express');
const moment = require('moment');
const router = express.Router();

const Exercise = require('../models/Exercise');
const User = require('../models/User');

exports.getUserExerciseLogs = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to, limit } = req.query;

        // Find the user by their ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let exerciseQuery = Exercise.find({ username: user.username });

        // Add date filtering if at least one of "from" or "to" parameters is provided
        if (from || to) {
            if (from) {
                exerciseQuery = exerciseQuery.where('date').gte(from);
            }

            if (to) {
                exerciseQuery = exerciseQuery.where('date').lte(to);
            }
        }

        // Add limit if provided
        if (limit) {
            exerciseQuery = exerciseQuery.limit(parseInt(limit, 10));
        }

        console.log('Exercise Query:', exerciseQuery.getQuery()); // Logging the exercise query

        // Execute the exercise query
        const exercises = await exerciseQuery.exec();

        // Format the date property of each exercise as a string using the dateString format
        const formattedExercises = exercises.map((exercise) => ({
            ...exercise._doc,
            date: new Date(exercise.date).toDateString(),
        }));

        console.log('Exercises:', formattedExercises); // Logging the retrieved exercises

        const response = {
            _id: user._id,
            username: user.username,
            from: from || undefined,
            to: to || undefined,
            count: formattedExercises.length,
            log: formattedExercises,
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};