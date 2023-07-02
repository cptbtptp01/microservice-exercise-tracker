# Exercise Tracker

Exercise Tracker is a web application that allows users to track their exercises. It provides functionality to create new users, add exercises for specific users, and retrieve exercise logs for users.

## Technologies
- node.js
- express
- api
- json
- npm
- javascript

## Features

- Create a new user by sending a POST request to `/api/users`
- Add exercises for a user by sending a POST request to `/api/users/:_id/exercises`
- Retrieve exercise logs for a user by sending a GET request to `/api/users/:_id/logs`
  - Optional query parameters:
    - `from`: Filter exercises by a starting date (yyyy-mm-dd)
    - `to`: Filter exercises by an ending date (yyyy-mm-dd)
    - `limit`: Limit the number of exercises returned

## Usage

1. Create a new user by entering a username in the provided input field and clicking "Submit"
2. Add exercises for a user by entering the user ID, exercise description, duration, and date in the provided input fields and clicking "Submit"
3. Retrieve exercise logs for a user by entering the user ID in the provided input field and clicking "Submit"
   - Optional: Use the query parameters (`from`, `to`, `limit`) to filter the results

