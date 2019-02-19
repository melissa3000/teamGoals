import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchComments } from '../actions';
import CommentList from './CommentList';
import { Link } from 'react-router-dom';

class GoalList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: {
				points: 0
			},
			showComments: false
		};
		console.log("state", this.state)
		// this.onClick = this.onClick.bind(this);
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
					goalId: goalId }
				}}
				className="waves-effect waves-light btn">Add a Comment
			</Link>
			</div>
		);
	}

	// onClick(goalId) {
	// 	this.renderComments(goalId)
	// }

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
				// console.log(data)
				let auth = {...this.state.auth}
				auth.points = data.points
				this.setState({auth})
				console.log("newstate", this.state)
			}))
		})
	}


	renderGoals() {
		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId} onClick={() => this.setState(prevState => ({showComments: !prevState.showComments}))}>
					<div className="card-content">
						<div>
							{goal.goal}			
								<button type="submit" className="teal btn-flat right white-text" onClick={() => this.markComplete(goal.goalId)}>
								Mark goal complete
								<i className="material-icons right">done</i>
								</button>
						</div>
						<div>
							{this.state.showComments && this.renderComments(goal.goalId)}
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

function mapStateToProps( { goals, comments, currentComment, auth }) {
	return { goals, comments, currentComment, auth};
}

export default connect(mapStateToProps, { fetchGoals, fetchComments })(GoalList);

