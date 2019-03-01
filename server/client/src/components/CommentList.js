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