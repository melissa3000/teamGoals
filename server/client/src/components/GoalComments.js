import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoalField from './GoalField';
import { createComment } from '../actions';


import 'react-widgets/dist/css/react-widgets.css'


class GoalComment extends Component {

	// use hard coded goalId initially for building
	getComments(goalId='783aaf02-86e5-478e-9abc-40d9ec67e384') {
		console.log("KEY: ", goalId);
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
			console.log(body);
			return body;
		});
	}

	
	renderFields() {
		// How do I get the post response in here to map over?
		return (
			<div>
			{ this.getComments()}
			<h3>Goal details coming soon TM</h3>
			</div>
			
		)
		// return this.props.body.map(goal => {
		// 	return (
		// 		<div>
		// 		<div className="card darken-1" key={goal.goalId}>
		// 			<div className="card-content">
		// 				<p>
		// 					{goal.goalId}
		// 				</p>
		// 			</div>
		// 		</div>

		// 			<div>
		// 				<Field 
		// 					label="Add a new comment" 
		// 					type="text"
		// 					name="commentText" 
		// 					component={GoalField} 
		// 				/>
		// 			</div>

		// 			<div>
		// 			<label htmlFor="completed">Mark as Complete</label>
		// 			<div>
		// 				<Field
		// 					name="complete"
		// 					id="employed"
		// 					component="input"
		// 					type="checkbox"
		// 				/>
		// 			</div>
		// 		</div>

		// 		</div>
		// 	);
		// })
	}

	onSubmit(values) {
		this.props.createComment(values, () => {
			this.props.history.push('/goals');
		});
	}
	
	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			{this.renderFields()}
				<Link to="/goals" className="red btn-flat white-text">
					Cancel
				</Link>
				<button type="submit" className="teal btn-flat right white-text">
					Submit
					<i className="material-icons right">done</i>
				</button>
			</form>
		);
	}
}

// function validate(values) {
// 	const errors = {};

// 	if (!values.commentText) {
// 		errors.commentText = "Please enter a team name to get started";
// 	}
// 	return errors;
// }


export default reduxForm({
	// validate,
	form: 'commentForm'
}) (
	connect(null, { createComment }) (GoalComment)
);
