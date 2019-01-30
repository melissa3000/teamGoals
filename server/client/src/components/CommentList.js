
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';


class CommentList extends Component {
	componentDidMount() {
		this.props.fetchComments();
	}

	renderComments(goal) {
		console.log("GOAL: ", goal);
		if (goal) {
		return (
			<div className="card darken-1" key={goal.commentId}>
				<div className="card-content">
					<p>
						{goal.comment}
					</p>
				</div>
			</div>
		);
		}
	}

	render() {
		return (
			<div>
				{this.renderComments()}
			</div>
		);
	}
}

function mapStateToProps( { comments }) {
	return { comments };
}

export default connect(mapStateToProps, { fetchComments })(CommentList);





//=========================================================================================
// Stuff I tried along the way, will delete soon:
//=========================================================================================
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchComments } from '../actions';


// class CommentList extends Component {
// 	componentDidMount() {
// 		this.props.fetchComments();
// 	}

// 	renderComments() {
// 		return this.props.comments.map(comment => {
// 			return (
// 				<div className="card darken-1" key={comment.commentId}>
// 					<div className="card-content">
// 						<p>
// 							{comment.comment}
// 						</p>
// 					</div>
// 				</div>
// 			);
// 		});
// 	}

// 	render() {
// 		return (
// 			<div>
// 				{this.renderComments()}
// 			</div>
// 		);
// 	}
// }

// function mapStateToProps( { comments }) {
// 	return { comments };
// }

// export default connect(mapStateToProps, { fetchComments })(CommentList);

//=========================================================================================

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import 'materialize-css/dist/css/materialize.min.css';
// import { Link } from 'react-router-dom';
// import { fetchComments, fetchGoals } from '../actions';


// class CommentList extends Component {
// 	componentDidMount() {
// 		this.props.fetchComments();
// 	}

// 	renderComments() {
// 		// console.log("These are the comments: ", this.props.comments);
// 		// console.log("Goal IDs: ", this.props.goals);

// 		return this.props.goals.map(goal => {
// 			return this.props.comments.map(comment => {
// 				if (goal.goalId === comment.goalId) {
// 					// console.log("They match!");
// 					return (
// 						<div className="card darken-1" key={comment.commentId}>
// 							<div className="card-content">
// 								<p>
// 									{comment.comment}
// 								</p>
// 							</div>
// 						</div>
// 					);
// 				} else {
// 					return (
// 						<div>
// 						<Link to="/comments/new" className="waves-effect waves-light btn">Add a Comment
// 						</Link>
// 					</div>
// 					)
// 				}
// 			}) 
// 		});
// 	}

// 	render() {
// 		return (
// 			<div>
// 				{this.renderComments()}
// 			</div>
// 		);
// 	}
// }

// function mapStateToProps( { comments, goals }) {
// 	return { comments, goals };
// }

// export default connect(mapStateToProps, { fetchComments, fetchGoals })(CommentList);


