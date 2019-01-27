import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions';


class CommentList extends Component {
	componentDidMount() {
		this.props.fetchComments();
	}

	renderComments() {
		return this.props.comments.map(comment => {
			return (
				<div className="card darken-1" key={comment.commentId}>
					<div className="card-content">
						<p>
							{comment.comment}
						</p>
					</div>
				</div>
			);
		});
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
