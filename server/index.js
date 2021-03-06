const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./services/passport');
require('./dbconnection');

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	// cookie expires in 30 days and will be automatically encrypted
	cookieSession({ 
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

// require function from authRoutes and call it with app to allow routes to access app and run routes
require('./routes/authRoutes')(app);
require('./routes/goalRoutes')(app);
require('./routes/teamRoutes')(app);
require('./routes/commentRoutes')(app);

// Allow dynamic port binding for deployment to Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
