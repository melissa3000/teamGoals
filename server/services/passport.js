const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../dbconnection');


// TODO: fix return done lines - they aren't working properly

// Create a new instance of the google passport strategy and point passport to it to enable google oAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			console.log(profile.id);
			db.con.query("SELECT * FROM users WHERE googleId='"+profile.id+"'", function(err, rows) {
				// console.log(rows);
				// console.log(rows[0]);
				// console.log(rows[0].googleId);
				if (err) {
					return done(err);
				}
				if (rows.length === 0) {
					console.log('Adding new user')
					let newUserMysql = new Object();
					newUserMysql.googleId = profile.id;
					let user_details = { googleId: profile.id }
					db.con.query('INSERT INTO users SET ?', user_details, (err, res) => {
						console.log('new user added')
					})
					// return done(null, newUserMysql);
				} else {
					console.log('user already in database')
					console.log(rows[0])
					// This next line isn't working correctly, rows[0] doesn't seem to work
					// return done(null, rows[0]);
				}
			});
		}
	)
);
