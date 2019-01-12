const passport = require('passport');

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
};