const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');


passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	db.con.query("SELECT * FROM users WHERE id='"+id+"'", function(err, rows) {
		if (err) {
			return done(err);
		} else {
			done(null, rows[0]);
		}
	});
});


// Create a new instance of the google passport strategy and point passport to it to enable google oAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			// console.log(profile.id);
			db.con.query("SELECT * FROM users WHERE googleId='"+profile.id+"'", function(err, rows) {
				if (err) {
					return done(err);
				}
				if (rows.length === 0) {
					console.log('Adding new user')
					let newUserMysql = new Object();
					newUserMysql.googleId = profile.id;
					
					let user_details = { id: uuidv4(), googleId: profile.id }
					db.con.query('INSERT INTO users SET ?', user_details, (err, res) => {
						if (err) {
							console.log('Error adding user: ', err.message);
						} else {
							console.log('new user added');
						}
					})
					done(null, newUserMysql);
				} else {
					console.log('user already in database')
					done(null, rows[0]);
				}
			});
		}
	)
);
