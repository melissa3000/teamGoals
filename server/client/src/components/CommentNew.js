import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoalField from './GoalField';
import { createComment } from '../actions';

import 'react-widgets/dist/css/react-widgets.css'


class CommentNew extends Component {
	componentDidMount() {
		let fullPath = window.location.pathname
		let goalId = fullPath.split("/")[3]

		this.setState({ goalId: goalId })
	}
	
	renderFields() {
		return (
			<div>
				<div>
					<Field 
						label="Add an encouraging comment" 
						type="text"
						name="comment" 
						component={GoalField} 
					/>
				</div>
				<div style={{ marginBottom: "20px"}}>
				</div>
			</div>
		);
	}

	onSubmit(values) {
		values["goalId"] = this.state.goalId
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

function validate(values) {
	const errors = {};

	if (!values.comment) {
		errors.comment = "Please enter a comment";
	}
	return errors;
}

export default reduxForm({
	validate,
	form: 'commentForm'
}) (
	connect(null, { createComment}) (CommentNew)
);


