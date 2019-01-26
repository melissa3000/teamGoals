const requireLogin = require('../middlewares/requireLogin');
const db = require('../dbconnection');
const uuidv4 = require('uuid/v4');

let comment = "Test comment";
let goalId = "783aaf02-86e5-478e-9abc-40d9ec67e384";


module.exports = app => {
	app.get('/api/add_comment', requireLogin, async (req, res) => {

		let comment_details = { commentId: uuidv4(), userId: req.user.id, goalId: goalId, comment: comment }
		let newComment = new Object();
		newComment.commentId = comment_details.commentId;

		console.log('comment_details: ', comment_details);
		console.log('newComment: ', newComment);

		db.con.query('INSERT INTO comments SET ?', comment_details, (err, res) => {
			if (err) {
				console.log('Error adding comment: ', err.message);
			} else {
				console.log('new comment added');
			}		
		})
		res.send(newComment);
	});

		app.get('/api/get_comments', (req, res) => {
		db.con.query("SELECT * FROM comments", (err, rows) => {
			if (err) {
					console.log(err);
			} else {
				res.send(rows);
			}
		})		
	});
};

