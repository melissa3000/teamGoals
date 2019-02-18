import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchComments } from '../actions';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';

class GoalList extends Component {
	constructor() {
		super();

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchGoals();
	}

	renderComments(goalId) {
		return (
			<div>
			<CommentList 
				goalId = {goalId}
			/>
			<Link to={{
				pathname:`/comments/new/${goalId}`,
				state: {
					goalId: goalId
				}
		}}
				className="waves-effect waves-light btn">Add a Comment
			</Link>
			</div>
		);
	}

	onClick(goalId) {
		this.renderComments(goalId)
	}

	markComplete(goalId) {
		console.log(goalId)
		const data = { goalId: goalId, markedComplete:1, points: 5}

		fetch('/api/mark_complete', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			this.props.fetchGoals();
			fetch('/api/update_points', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then((res) => {
				return res.json();
			})
			.then((data => {
				console.log(data)
				this.setState({points: data.points})
			}))
		})
	}


	renderGoals() {
		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId} onClick={() => this.onClick(goal.goalId)}>
					<div className="card-content">
						<div>
							{goal.goal}			
								<button type="submit" className="teal btn-flat right white-text" onClick={() => this.markComplete(goal.goalId)}>
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


