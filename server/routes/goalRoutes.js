// const keys = require('../config/keys');
// const requireLogin = require('../middlewares/requireLogin');
// const db = require('../dbconnection');

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
