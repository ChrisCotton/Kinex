const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
const passport = require('passport');

require('./models/User');
require('./models/Project');

mongoose.connect(keys.mongoURI, (err) => {
	if(err) throw err
	else console.log("Successfully connected to MongoDB");
});

const index = require('./routes/index');
const auth = require('./routes/auth');
const admin = require('./routes/admin');

const app = express();
app.use(cors());

app.use(passport.initialize());
require('./services/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/auth', auth);
app.use('/admin', admin);

const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;
