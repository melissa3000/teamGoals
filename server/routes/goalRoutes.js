const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

let goal = "This is a hard coded test goal for dev";

module.exports = app => {
	app.get('/api/add_goal', requireLogin, (req, res) => {
		console.log("This is the userid: ", req.user.id);

	// 	// const { goalId, userId, teamId, goal, markedComplete } = req.body;

		// const newGoal = {
		// 	goalId: uuidv4(),
		// 	userId: req.user.id,
		// 	teamId,
		// 	goal,
		// 	markedComplete
		// };

		// add teamName to table and teamId to goal_details (must create team before goal that goes into it)

		let goal_details = { goalId: uuidv4(), userId: req.user.id, goal: goal, markedComplete: false }
		db.con.query('INSERT INTO goals SET ?', goal_details, (err, res) => {
			if (err) {
				console.log('Error adding goal: ', err.message);
			} else {
				console.log('new goal added');
			}
		// res.send(goal);
		})

	});
};