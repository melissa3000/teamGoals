import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';
import PropTypes from 'prop-types';

import 'react-widgets/dist/css/react-widgets.css'

class CommentList extends Component {
	constructor() {
		super();
		this.state = {
			comments: []
		};
	}
	componentDidMount() {
		this.props.fetchComments();

		const data = { goalId: this.props.goalId}

		fetch('/api/get_comments', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			return res.json()
		}).then((body => {
			let comments = body.map((comment) => {
				return(
					<div key={comment.commentId}>
					<p>{comment.comment}</p>
					</div>
				)
			})
			this.setState({comments: comments});
		}))
	}
	
	renderComments() {
		return(
			<div className="container2">
				<div className="container1">
					{this.state.comments}
				</div>
				<br />
			 	<div>

				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				{ this.renderComments() }
			</div>
		);
	}
}

CommentList.propTypes = {
	goalId: PropTypes.string
};

function mapStateToProps( { comments }) {
	return { comments };
}

export default connect(mapStateToProps, { fetchComments })(CommentList);











//=========================================================================================
// Stuff I tried along the way, will delete soon:
//=========================================================================================

// with Mihir's help (I think this is a better way, try to implement after 
// getting brute force solution)


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
// 		const data = this.props.comments.map(comment => {
// 				if (this.props.goalId === comment.goalId) {
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
// 				}
// 			}) || [];

// 		data.push(
// 			<div>
// 			<Link to="/comments/new" className="waves-effect waves-light btn">Add a Comment
// 			</Link>
// 		</div>
// 		);

// 		return data;
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

