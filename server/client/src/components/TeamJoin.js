import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoalField from './GoalField';
import { joinTeam } from '../actions';


import 'react-widgets/dist/css/react-widgets.css'


class TeamJoin extends Component {
	renderFields() {
		return (
			<div>
				<div>
					<Field 
						label="Enter the Team Passcode to Join A Friend's Team" 
						type="text"
						name="teamInviteToken" 
						component={GoalField} 
					/>
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.joinTeam(values, () => {
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

	if (!values.teamInviteToken) {
		errors.teamInviteToken = "Please enter a team passcode to join a team";
	}
	return errors;
}


export default reduxForm({
	validate,
	form: 'joinTeam'
}) (
	connect(null, { joinTeam }) (TeamJoin)
);
