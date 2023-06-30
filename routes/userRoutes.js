const express = require('express');
const router = express.Router();

// import database
const User = require('../models/User');
// import function
const { validateUsername } = require('../functions/validateUsername');

router.post('/', async (req, res) => {
    try {
        const { username } = req.body;

        // // check if user already exists
        // const isExistingUser = await validateUsername(username);
        // if (isExistingUser) {
        //   // client error 4xx
        //   return res.status(409).json({ error: 'username exists' });
        // }

        // save to database
        const userDocument = new User({
            username
        });
        const savedUser = await userDocument.save();

        res.json({
            username: savedUser.username,
            _id: savedUser.id,
        })
    } catch (error) {
        console.error(error);
        // server error 5xx
        res.status(500).json({ error: 'Server error1' });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, { _id: 1, username: 1 });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'server error3' });
    }
});

module.exports = router;