const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

// let goal = "This is a hard coded test goal for dev";

// module.exports = (app) => {
// 	app.post('/api/addGoal', requireLogin, (req, res) => {
// 		let goal_details = { goalId: uuidv4(), userId: user.id, goal: goal }
// 		db.con.query('INSERT INTO goals SET ?', goal_details, (err, res) => {
// 			if (err) {
// 				console.log('Error adding goal: ', err.message);
// 			} else {
// 				console.log('new goal added');
// 			}
// 		})
// 	});
// };

module.exports = (app) => {
	app.get('/api/add_goal', (req, res) => {
		console.log("I got into the goal api page");
		
		// res.render('/');

		// const { goal="This is a hard coded test goal for dev", teamId="", markedComplete=false } = req.body;

		const newGoal = new Object();
		newGoal.userId = req.user.id;

		console.log("This is the req object", req.body);

		// // const newGoal = {
		// // 	goalId: uuidv4(),
		// // 	userId: req.user.id,
		// // 	teamId,
		// // 	goal,
		// // 	markedComplete
		// // }


		// let goal_details = { goalId: uuidv4(), userId: req.user.id, teamId: teamId, goal: goal, markedComplete: markedComplete }
		// db.con.query('INSERT INTO goals SET ?', goal_details, (err, res) => {
		// 	if (err) {
		// 		console.log('Error adding goal: ', err.message);
		// 	} else {
		// 		console.log('new goal added');
		// 	}
		// })

	});
};






// let newUserMysql = new Object();
// newUserMysql.googleId = profile.id;

// let user_details = { id: uuidv4(), googleId: profile.id }
// db.con.query('INSERT INTO users SET ?', user_details, (err, res) => {
// 	if (err) {
// 		console.log('Error adding user: ', err.message);
// 	} else {
// 		console.log('new user added');
// 	}
// })
// done(null, newUserMysql);
