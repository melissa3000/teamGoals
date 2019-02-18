// const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

module.exports = app => {
	app.post('/api/add_goal', requireLogin, async (req, res) => {
		
		let newUserGoal = new Object();
		let teamInfo = req.body.teamName;
		let goal_details

		if (teamInfo) {
			goal_details= { goalId: uuidv4(), userId: req.user.id, goal: req.body.goal, TeamId: req.body.teamName.teamID, markedComplete: false }
		} else {
			goal_details= { goalId: uuidv4(), userId: req.user.id, goal: req.body.goal, markedComplete: false }
		}
		newUserGoal.goalId = goal_details.goalId

		db.con.query('INSERT INTO goals SET ?', goal_details, (err, res) => {
			if (err) {
				console.log('Error adding goal: ', err.message);
			} else {
				console.log('new goal added');
			}		
		})
		res.send(newUserGoal);
	});

	// only return goals that have not already been completed
	app.get('/api/user_goals', (req, res) => {
		db.con.query("SELECT * FROM goals WHERE userId='"+req.user.id+"' AND markedComplete=0", (err, rows) => {
			if (err) {
					console.log(err);
			} else {
				res.send(rows);
			}
		})		
	});

	app.post('/api/mark_complete', requireLogin, async (req, res) => {
		db.con.query("UPDATE goals SET markedComplete=1 WHERE goalId='"+req.body.goalId+"'", (err, rows) => {
			if (err) {
					console.log(err);
			} else {
				res.send(rows);
			}
		})		
	});

};
