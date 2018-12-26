const express = require('express');
const keys = require('./config/keys');
const mysql = require('mysql');
require('./services/passport');

// connect to mysql db
let con = mysql.createConnection({
	host: 'localhost',
	user: keys.dbUser,
	password: keys.dbPassword,
	database: 'teamgoals'
});

con.connect(function(err) {
	if (err) throw err;
	console.log('Connected to db');
});

const app = express();

// require function from authRoutes and call it with app to allow routes to access app and run routes
require('./routes/authRoutes')(app);

// Allow dynamic port binding for deployment to Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
