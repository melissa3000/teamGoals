import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchComments, updatePoints } from '../actions';
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
		// console.log("state", this.state)
		// this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchGoals();
	}

	renderComments(goalId) {
		console.log(goalId)
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
				console.log("This is my data: ", data)
				let auth = {...this.state.auth}
				auth.points = data.points
				// debugger;
				this.setState({auth})
				this.props.updatePoints(data.points + 5)
				// console.log("newstate", this.state)
			}))
		})
	}


	renderGoals() {
		// console.log(this.state)

		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId} onClick={() => this.setState(prevState => {
					// console.log(prevState)
					// console.log(prevState[`showComments_${goal.goalId}`])
					return ({[`showComments_${goal.goalId
					}`]: !prevState[`showComments_${goal.goalId}`]})
				})}>
					<div className="card-content">
						<div>
							{goal.goal}			
								<button type="submit" className="teal btn-flat right white-text" onClick={() => this.markComplete(goal.goalId)}>
								Mark goal complete
								<i className="material-icons right"></i>
								</button>
						</div>
						<div>
							{this.state[`showComments_${goal.goalId}`] && this.renderComments(goal.goalId)}
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

const mapDispatchToProps = {
	updatePoints, fetchGoals, fetchComments
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalList);

