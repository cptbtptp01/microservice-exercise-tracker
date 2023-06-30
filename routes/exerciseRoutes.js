const express = require('express');
const router = express.Router();

const { validateAndParseDate } = require('../functions/validateDate');

// import database
const User = require('../models/User');
const Exercise = require('../models/Exercise');

router.post('/:id/exercises', async (req, res) => {
    try {
        const userId = req.params.id
        // parsing information
        const { description, duration, date } = req.body;

        // validate and format date
        // specify expected format
        const formattedDate = validateAndParseDate(date);
        if (!formattedDate) {
            return res.status(400).json({ error: 'Invalid date, please use YYYY-MM-DD.' });
        }

        // retrieve userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        // save to database
        const exerciseDocument = new Exercise({
            username: user.username,
            description,
            duration,
            date: formattedDate,
        });

        const savedExercise = await exerciseDocument.save();
        console.log('exercise saved to database:', savedExercise);

        // add exercise to the user object
        user.exercise.push(savedExercise);
        const savedUser = await user.save();
        console.log('user saved to database:', savedUser);

        res.json({
            _id: savedUser._id,
            username: savedUser.username,
            date: new Date(savedExercise.date).toDateString(),
            duration: savedExercise.duration,
            description: savedExercise.description,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error2' });
    }
});

module.exports = router;