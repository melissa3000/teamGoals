// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchGoals } from '../actions';
// import CommentList from './CommentList';


// class GoalList extends Component {
// 	componentDidMount() {
// 		this.props.fetchGoals();
// 	}

// 	// onSubmit(values) {
// 	// 	this.props.createTeam(values, () => {
// 	// 		this.props.history.push('/goals');
// 	// 	});
// 	// }
// 	toggleComments() {
// 		console.log("hello there");
// 	}

// 	renderGoals() {
// 		return this.props.goals.map(goal => {
// 			return (
// 				<div className="card darken-1" key={goal.goalId}>
// 					<div className="card-content">
// 						<p onClick={this.toggleComments}>
// 							{goal.goal}
// 						</p>
// 					</div>
// 				</div>
// 			);
// 		});
// 	}

// 	render() {
// 		return (
// 			<div>
// 				{this.renderGoals()}
// 			</div>
// 		);
// 	}
// }

// function mapStateToProps( { goals }) {
// 	return { goals };
// }

// export default connect(mapStateToProps, { fetchGoals })(GoalList);



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchComments } from '../actions';
import CommentList from './CommentList';


class GoalList extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchGoals();
	}

	renderComments() {
		return (
		<CommentList />
		);
	}

	handleClick() {
		const currentComment = this.props.currentComment;
	
	}


	// toggleComments(id) {
	// 	console.log("hello there");
	// 	console.log(id)
	// 	// this.fetchComments();
	// }
	// toggleComments(values) {
	// 	this.props.fetchComments(values, () => {
	// 		this.props.history.push('/goals');
	// 	});
	// }


	renderGoals() {
		const renderComments = this.renderComments();
		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId}>
					<div className="card-content">
						<p onClick={this.handleClick}>
							{goal.goal}
							{ renderComments }
						</p>
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

function mapStateToProps( { goals, comments }) {
	return { goals, comments};
}

export default connect(mapStateToProps, { fetchGoals, fetchComments })(GoalList);



