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

// ================================================================================
// shows all comments under each goal

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchGoals, fetchComments } from '../actions';
// import CommentList from './CommentList';


// class GoalList extends Component {
// 	constructor() {
// 		super()
// 		this.handleClick = this.handleClick.bind(this);
// 	}

// 	componentDidMount() {
// 		this.props.fetchGoals();
// 	}

// 	renderComments() {
// 		return (
// 		<CommentList />
// 		);
// 	}

// 	handleClick() {
// 		const currentComment = this.props.currentComment;
	
// 	}


// 	// toggleComments(id) {
// 	// 	console.log("hello there");
// 	// 	console.log(id)
// 	// 	// this.fetchComments();
// 	// }
// 	// toggleComments(values) {
// 	// 	this.props.fetchComments(values, () => {
// 	// 		this.props.history.push('/goals');
// 	// 	});
// 	// }


// 	renderGoals() {
// 		const renderComments = this.renderComments();
// 		return this.props.goals.map(goal => {
// 			return (
// 				<div className="card darken-1" key={goal.goalId}>
// 					<div className="card-content">
// 						<p onClick={this.handleClick}>
// 							{goal.goal}
// 							{ renderComments }
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

// function mapStateToProps( { goals, comments }) {
// 	return { goals, comments};
// }

// export default connect(mapStateToProps, { fetchGoals, fetchComments })(GoalList);


// ================================================================================

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchComments } from '../actions';
import CommentList from './CommentList';
import combineReducers from '../reducers';


class GoalList extends Component {
	constructor() {
		super()
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchGoals();
	}

	renderComments() {
		return (
				<CommentList />		
		);
	}

	onClick(goalId) {
		// console.log(this.props.goals);
		console.log("I clicked");
		console.log("KEY: ", goalId);

		// this.props.fetchComments(goalId, () => {
		// 	console.log("I fetched comments");
		// });
		// this.props.fetchComments(goalId);
		const data = { goalId: goalId}

		fetch('/api/get_comments', {
			method: 'POST',
			headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
			body: JSON.stringify(data)
		})
		.then(function(res) {
			return res.json()
		}).then(function(body) {
			console.log(body);
		});
	}


	renderGoals() {
		// const renderComments = this.renderComments();
		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId} onClick={() => this.onClick(goal.goalId)}>
					<div className="card-content">
						<div>
							{goal.goal}
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

function mapStateToProps( { goals, comments }) {
	return { goals, comments};
}

// function mapStateToProps( { goals, comments }, ownProps) {
// 	return { goals, comments: ownProps.goalId };
// }

export default connect(mapStateToProps, { fetchGoals, fetchComments })(GoalList);

// export default ({ goalId }) (
// 	connect(mapStateToProps, { fetchGoals, fetchComments })(GoalList)
// );
