const express = require('express');
const router = express.Router();

const Exercise = require('../models/Exercise');
const User = require('../models/User');

router.get('/:id/logs', async(req, res) => {
    try {
        const userId = req.params.id;
        const { from, to, limit } = req.query;

        // find the user id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'user not found'});
        }

        // build query
        const conditions = { username: user.username };
        if (from) {
            conditions.date = { $gte: new Date(from) };
        }
        if (to) {
            conditions.date = { ...conditions.date, $lte: new Date(to) };
        }

        // query the exercise log
        let query = Exercise.find(conditions).lean();
        if (limit) {
            query = query.limit(parseInt(limit));
        }
        const exerciseLog = await query.exec();

        //build response object
        const log = exerciseLog.map((exercise) => ({
            description: exercise.description,
            duration: exercise.duration,
            date: new Date(exercise.date).toDateString(),
        }));

        res.json({
            _id: user._id,
            username: user.username,
            count: exerciseLog.length,
            log: log,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error' });
    }
});

module.exports = router;