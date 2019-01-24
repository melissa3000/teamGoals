const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

module.exports = app => {
	app.post('/api/add_goal', requireLogin, async (req, res) => {

		// add teamName to table and teamId to goal_details (must create team before goal that goes into it)
		console.log('req.body.teamName.team: ', req.body.teamName);

		let goal_details = { goalId: uuidv4(), userId: req.user.id, goal: req.body.goal, markedComplete: false }
		let newUserGoal = new Object();
		newUserGoal.goalId = goal_details.goalId

		console.log('goal_details: ', goal_details);
		console.log('newusergoal: ', newUserGoal);

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
