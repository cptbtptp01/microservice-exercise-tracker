const User = require('../models/User');

const validateUsername = async (username) => {
    try {
        // require querying the database to check which is asynchronous task
        // involves waiting
        // pause the execution until the result is obtained
        const existingUser = await User.findOne({ username });
        // return false if username valid(not found in database)
        return !!existingUser;
    } catch (error) {
        // handle error occur during querying
        console.error(error);
        throw new Error("database error");
    }
};

module.exports = { validateUsername };