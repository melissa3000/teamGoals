const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const db = require('../dbconnection');


// Create a new instance of the google passport strategy and point passport to it to enable google oAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		// (profile, done) => {
		// 	// db.userExists
		// 	console.log(profile.id);
		// 	db.con.query("SELECT * FROM users WHERE googleId='"+profile.id+"'", function(err, rows) {
		// 		console.log(rows);
		// 		if (err){
		// 			console.log('error looking for record');
		// 			// return done(err);
		// 		} else {
		// 			console.log(`Adding new user`)
		// 			let newUser = new Object;
		// 			newUserID = profile.id;
		// 			let user_details = { googleId: googleId }
		// 				db.con.query('INSERT INTO users SET ?', user_details, (err, res) => {
		// 					if (err) throw err;
		// 					console.log('new user added successfully');
		// 					// return done(null, newUser)
		// 			})
		// 		}
		// 	})
		// }
		(accessToken, refreshToken, profile, done) => {
			console.log(profile.id);
			db.con.query("SELECT * FROM users WHERE googleId='"+profile.id+"'", function(err, rows) {
				console.log(rows);
				if (rows.length === 0) {
					console.log('Adding new user')
					let user_details = { googleId: profile.id }
					db.con.query('INSERT INTO users SET ?', user_details, (err, res) => {
						console.log('new user added')
					})
				}
			});
			
				// if (rows.length === 0) {
				// 	let user_details = { googleId: googleId }
				// 	db.con.query('INSERT INTO users SET ?', user_details, (err, res) => {
				// 		// if (err) throw err;
				// 		console.log('new user added successfully');
				// 	}
				// }
			
				// .then(user => db.userExists(user));
			// db.userExists(profile.id);			
			// db.createUser(profile.id);

			// TODO: call done function when user verification is working:
			// syntax is done(errors, userRecord)

		}
	)
);