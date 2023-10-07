require('dotenv').config();

// import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// import routes
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

// connect to mongoDB
const db = require('./db');

// configure body-parser
// parse POST bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');


app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// use routes
app.use('/api/users', userRoutes);
app.use('/api/users', exerciseRoutes);

app.get('/api/users/:id/logs', logRoutes.getUserExerciseLogs);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
