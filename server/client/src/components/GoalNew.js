import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import GoalField from './GoalField';
import TeamDropdown from './TeamDropdown';
import * as actions from '../actions';


import 'react-widgets/dist/css/react-widgets.css'


// ToDo: make teams dynamic (currently called colors) 
let colors = [ { color: 'Red', value: 'ff0000' },
{ color: 'Green', value: '00ff00' },
{ color: 'Blue', value: '0000ff' } ];


class GoalNew extends Component {
	renderFields() {
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
						data={colors}
						valueField="value"
						textField="color" />
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
			<form onSubmit={this.props.handleSubmit(values => actions.createGoal(values))}>
				{this.renderFields()}
				<Link to="/goals" className="red btn-flat white-text">
					Cancel
				</Link>
				<button type="submit" className="teal btn-flat right white-text">
					Submit
					<i className="material-icons right">done</i>
				</button>
			</form>
			</div>
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


// export default GoalNew = reduxForm({
// 	validate,
// 	form: 'goalForm'
// })(GoalNew);

GoalNew = reduxForm({
	validate,
	form: 'goalForm'
})(GoalNew);

function mapStateToProps(state) {
	console.log('state: ', state);
	// console.log('state.form.goalForm: ', state.form.goalForm);
	// return { formValues: state.form.goalForm.values };
}

export default connect(mapStateToProps, actions)(GoalNew);

// <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
