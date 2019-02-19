import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoalField from './GoalField';
import TeamDropdown from './TeamDropdown';
import { createGoal } from '../actions';
import { fetchTeams } from '../actions';

import 'react-widgets/dist/css/react-widgets.css'


class GoalNew extends Component {
	componentDidMount() {
		this.props.fetchTeams();
	}
	
	renderFields() {
		let teams = this.props.teams;
		return (
			<div>
				<div>
					<Field 
						label="Goal" 
						type="text"
						name="goal" 
						component={GoalField} 
					/>
				</div>
				<div style={{ marginBottom: "20px"}}>
        	<label>Would you like to share your goal with a team?</label>
					<Field 
						name="teamName" 
						component={TeamDropdown}
						data={teams}
						valueField="teamID"
						textField="teamName" />
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createGoal(values, () => {
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

	if (!values.goal) {
		errors.goal = "Please enter a goal";
	}
	return errors;
}

function mapStateToProps( { teams }) {
	return { teams };
}

export default reduxForm({
	validate,
	form: 'goalForm'
}) (
	connect(mapStateToProps, { createGoal, fetchTeams}) (GoalNew)
);


