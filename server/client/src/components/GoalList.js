import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchComments } from '../actions';
import CommentList from './CommentList';


class GoalList extends Component {
	constructor() {
		super();

		this.onClick = this.onClick.bind(this);
	}

	renderComments(goalId) {
		return (
			<CommentList 
				goalId = {goalId}
			/>
		);
	}

	onClick(goalId) {
		this.renderComments(goalId)
	}


	componentDidMount() {
		this.props.fetchGoals();
	}

	renderGoals() {
		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId} onClick={() => this.onClick(goal.goalId)}>
					<div className="card-content">
						<div>
							{goal.goal}			
								<button type="submit" className="teal btn-flat right white-text">
								Mark goal complete
								<i className="material-icons right">done</i>
								</button>
						</div>
						<div>
							{this.renderComments(goal.goalId)}
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.renderGoals()}
			</div>
		);
	}
}

function mapStateToProps( { goals, comments, currentComment }) {
	return { goals, comments, currentComment};
}

export default connect(mapStateToProps, { fetchGoals, fetchComments })(GoalList);


