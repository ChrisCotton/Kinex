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
require('./models/Issue');

mongoose.connect(keys.mongoURI, (err) => {
	if(err) throw err
	else console.log("Successfully connected to MongoDB");
});

//Routes
const common = require('./routes/common');
const auth = require('./routes/authRoute');
const admin = require('./routes/adminRoute');
const issue = require('./routes/issueRoute');

const app = express();
app.use(cors());

app.use(passport.initialize());
require('./services/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', common);
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/issue', issue);

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;
