const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

module.exports = app => {
	app.get('/api/add_team', requireLogin, async (req, res) => {

		let teamName = "Very first team";
		let teamInviteToken = "joinUs!"
		// console.log('req.body.teamName.team: ', req.body.teamName);

		let team_details = { teamId: uuidv4(), teamName: teamName, teamInviteToken: teamInviteToken }
		let newTeam = new Object();
		newTeam.teamId = team_details.teamId

		console.log('team_details: ', team_details);
		console.log('newteam: ', newTeam);

		db.con.query('INSERT INTO teams SET ?', team_details, (err, res) => {
			if (err) {
				console.log('Error adding tea: ', err.message);
			} else {
				console.log('new team added');
			}		
		})
		res.send(newTeam);
	});

	// app.get('/api/user_teams', (req, res) => {
	// 	db.con.query("SELECT * FROM users WHERE TeamId='"+req.user.Teamid+"'", (err, rows) => {
	// 		if (err) {
	// 				console.log(err);
	// 		} else {
	// 			res.send(rows);
	// 		}
	// 	})		
	// });

};
