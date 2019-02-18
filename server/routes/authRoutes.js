const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');

// exports function with routes so it can be used in index.js
module.exports = (app) => {
// route handler to authenticate user through google oauth
// scope defines the user's permissions that we're asking to access
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// route handler to handle callback from google oauth response.
	// passport uses the user's oauth code to exchange it for the user's profie at google
	app.get(
		'/auth/google/callback', 
		passport.authenticate ('google'),
		(req, res) => {
			res.redirect('/goals');
		},
		// if google sends token error, redirect to the login page
		(err, req, res, next) => {
			console.log('This is the error: ', err);
			console.log('This is the error name: ', err.name);
			if (err.name === 'TokenError') {
				res.redirect('/auth/google');
			} 
		}
	);
	
	// use built in logout method from passport
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	// test that user authentication worked
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	// update points when goal is complete
	app.post('/api/update_points', requireLogin, async (req, res) => {
		db.con.query("SELECT points FROM users WHERE id='"+req.user.id+"'", (err, rows) => {
			if (err) {
					console.log(err);
			} else {
				let current_points = Number(rows[0].points)
				let new_points = req.body.points
				let updated_points = current_points + new_points
				db.con.query("UPDATE users SET points='"+updated_points+"'WHERE id='"+req.user.id+"'")
				res.send(req.user);
			}
		}	
	)});
};
