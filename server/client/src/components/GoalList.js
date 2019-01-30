
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals, fetchComments } from '../actions';
import { Link } from 'react-router-dom';
import GoalComments from './GoalComments';

class GoalList extends Component {
	constructor() {
		super();

		this.state = {
			clicked: true,
			currentGoal: ''
		};

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchGoals();
	}

	renderComments(goal) {
		console.log("GOAL: ", goal);
		if (goal) {
			console.log("goaltext: ", goal.comment)
			// return (
			// 	<div className="card darken-1" key={goal.commentId}>
			// 		<div className="card-content">
			// 			<p>
			// 				{goal.comment}
			// 			</p>
			// 				<h3>I should see each comment</h3>
			// 		</div>
			// 	</div>
			// );
			return (
				<div>

				<GoalComments />
				</div>
			)
		}
	}


	onClick(goalId) {
		
		this.setState({
			clicked: true,
			currentGoal: goalId
		});
		console.log(this.state.clicked);
		console.log("I clicked");
		console.log("KEY: ", goalId);
		console.log(this.props);

		const data = { goalId: goalId}

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
		}).then((body) => {
			body.map(goal => {
				console.log("I got into the final then");
				this.renderComments(goal);
			})
		});
	}

	renderGoals() {
		const renderComments = this.renderComments();
		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId} onClick={() => this.onClick(goal.goalId)}>
					<div className="card-content">
						<div>
							<Link to="/goals/comments" className="btn-flat black-text">
							{goal.goal}
						</Link>
						</div>
					</div>
				</div>
			);
		});
	}
	// Should this be clicked or toggle? Or just go to a new route? /goals/comments so that I can do more with it
	// {this.state.clicked ? { renderComments } : null}


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




//=========================================================================================
// Stuff I tried along the way, will delete soon:
//=========================================================================================
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
// makes query correctly to get each comment but does not display them

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchGoals, fetchComments } from '../actions';


// class GoalList extends Component {
// 	constructor() {
// 		super();

// 		this.state = {
// 			clicked: false
// 		};

// 		this.onClick = this.onClick.bind(this);
// 	}

// 	componentDidMount() {
// 		this.props.fetchGoals();
// 	}

// 	renderComments(goal) {
// 		console.log("GOAL: ", goal);
// 		if (goal) {
// 			console.log("goaltext: ", goal.comment)
// 			return (
// 				<div className="card darken-1" key={goal.commentId}>
// 					<div className="card-content">
// 						<p>
// 							{goal.comment}
// 						</p>
// 							<h3>I should see each comment</h3>
// 					</div>
// 				</div>
// 			);
// 		}
// 	}

// 	onClick(goalId) {
		
// 		this.setState({
// 			clicked: true
// 		});
// 		console.log(this.state.clicked);
// 		console.log("I clicked");
// 		console.log("KEY: ", goalId);

// 		const data = { goalId: goalId}

// 		fetch('/api/get_comments', {
// 			method: 'POST',
// 			headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
// 			body: JSON.stringify(data)
// 		})
// 		.then((res) => {
// 			return res.json()
// 		}).then((body) => {
// 			body.map(goal => {
// 				console.log("I got into the final then");
// 				this.renderComments(goal);
// 			})
// 		});
// 	}

// 	renderGoals() {
// 		// const renderComments = this.renderComments();
// 		return this.props.goals.map(goal => {
// 			return (
// 				<div className="card darken-1" key={goal.goalId} onClick={() => this.onClick(goal.goalId)}>
// 					<div className="card-content">
// 						<div>
// 							{goal.goal}
// 						</div>
// 					</div>
// 				</div>
// 			);
// 		});
// 	}
// 	// {this.state.clicked ? { renderComments } : null}


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

