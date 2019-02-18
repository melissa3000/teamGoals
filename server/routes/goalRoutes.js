const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

module.exports = app => {
	app.post('/api/add_goal', requireLogin, async (req, res) => {
		
		let newUserGoal = new Object();
		let teamInfo = req.body.teamName;
		// console.log(teamId)
		let goal_details
		if (teamInfo) {
			goal_details= { goalId: uuidv4(), userId: req.user.id, goal: req.body.goal, TeamId: req.body.teamName.teamID, markedComplete: false }

		} else {
			console.log("I got into the else")
			goal_details= { goalId: uuidv4(), userId: req.user.id, goal: req.body.goal, markedComplete: false }

		}
		newUserGoal.goalId = goal_details.goalId
		// console.log('goal_details: ', goal_details);
		// console.log('newusergoal: ', newUserGoal);

		db.con.query('INSERT INTO goals SET ?', goal_details, (err, res) => {
			if (err) {
				console.log('Error adding goal: ', err.message);
			} else {
				console.log('new goal added');
			}		
		})
		res.send(newUserGoal);
	});

	app.get('/api/user_goals', (req, res) => {
		db.con.query("SELECT * FROM goals WHERE userId='"+req.user.id+"'", (err, rows) => {
			if (err) {
					console.log(err);
			} else {
				res.send(rows);
			}
		})		
	});

};
