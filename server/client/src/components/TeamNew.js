import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoalField from './GoalField';
import { createTeam } from '../actions';


import 'react-widgets/dist/css/react-widgets.css'


class TeamNew extends Component {
	renderFields() {
		return (
			<div>
				<div>
					<Field 
						label="Team Name" 
						type="text"
						name="teamName" 
						component={GoalField} 
					/>
				</div>
				<div style={{ marginBottom: "20px"}}>
					<div>
						<Field 
							label="Set a secret code or phrase for friends to be able to join your team" 
							type="text"
							name="teamInviteToken" 
							component={GoalField} 
						/>
				</div>
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createTeam(values, () => {
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

	if (!values.teamName) {
		errors.teamName = "Please enter a team name to get started";
	}
	return errors;
}


export default reduxForm({
	validate,
	form: 'teamForm'
}) (
	connect(null, { createTeam }) (TeamNew)
);
