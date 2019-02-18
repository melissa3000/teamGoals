const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

let comment = "Doing great!";
let goalId = "783aaf02-86e5-478e-9abc-40d9ec67e384";


module.exports = app => {
	app.post('/api/add_comment', requireLogin, async (req, res) => {

		let comment_details = { commentId: uuidv4(), userId: req.user.id, goalId: req.body.goalId, comment: req.body.comment }
		let newComment = new Object();
		newComment.commentId = comment_details.commentId;

		db.con.query('INSERT INTO comments SET ?', comment_details, (err, res) => {
			if (err) {
				console.log('Error adding comment: ', err.message);
			} else {
				console.log('new comment added');
			}		
		})
		res.send(newComment);
	});

	app.post('/api/get_comments', requireLogin, async (req, res) => {
		db.con.query("SELECT * FROM comments WHERE goalId='"+req.body.goalId+"'", (err, rows) => {
			if (err) {
					console.log(err);
			} else {
				res.send(rows);
			}
		})		
	});
};

