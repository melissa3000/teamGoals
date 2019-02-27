const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

module.exports = app => {
	app.post('/api/add_team', requireLogin, async (req, res) => {

		let team_details = { teamId: uuidv4(), teamName: req.body.teamName, teamInviteToken: req.body.teamInviteToken }
		let newTeam = new Object();
		newTeam.teamId = team_details.teamId

		console.log('team_details: ', team_details);
		console.log('newteam: ', newTeam);

		db.con.query('INSERT INTO teams SET ?', team_details, (err, res) => {
			if (err) {
				console.log('Error adding team: ', err.message);
			} else {
				console.log('new team added');
			}		
		})
		res.send(newTeam);
	});

		app.get('/api/user_teams', (req, res) => {
		db.con.query("SELECT * FROM teams", (err, rows) => {
			if (err) {
					console.log(err);
			} else {
				res.send(rows);
			}
		})		
	});

	// join_team

	// app.get('/api/user_teams', (req, res) => {
	// 	db.con.query("SELECT * FROM teams WHERE userId='"+req.user.id+"'", (err, rows) => {
	// 		if (err) {
	// 				console.log(err);
	// 		} else {
	// 			res.send(rows);
	// 		}
	// 	})		
	// });

	// app.get('/api/team_goals', (req, res) => {
	// 	db.con.query("SELECT * FROM goals WHERE TeamId='d2533c07-9dd6-4633-97b4-38dfe4630eef'", (err, rows) => {
	// 		if (err) {
	// 				console.log(err);
	// 		} else {
	// 			res.send(rows);
	// 		}
	// 	})		
	// });

};

