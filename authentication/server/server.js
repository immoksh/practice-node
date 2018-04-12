const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth')

const {User} = require('./models/user');
app.user(bodyParser.json());


app.listen(port, () => {
	console.log(`Started on port ${port}`);
})