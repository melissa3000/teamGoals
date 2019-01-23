import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoalField from './GoalField';
import TeamDropdown from './TeamDropdown';
import { createGoal } from '../actions';


import 'react-widgets/dist/css/react-widgets.css'


// ToDo: make teams dynamic (currently called colors) 
let colors = [ { name: 'team 1' },
{ name: 'team 2' },
{ name: 'team 3' } ];

// should I add teamId to this as the value field?
// { color: 'Blue', value: 'team 3' } 

// name="teamName" 
// component={TeamDropdown}
// data={colors}
// valueField="value"
// textField="color" 

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
						valueField="name"
						textField="name" />
				</div>
			</div>
		);
	}

	// render() {
	// 	return (
	// 		<div>
	// 		<form onSubmit={this.props.handleSubmit(values => createGoal(values))}>
	// 			{this.renderFields()}
	// 			<Link to="/goals" className="red btn-flat white-text">
	// 				Cancel
	// 			</Link>
	// 			<button type="submit" className="teal btn-flat right white-text">
	// 				Submit
	// 				<i className="material-icons right">done</i>
	// 			</button>
	// 		</form>
	// 		</div>
	// 	);
	// }

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


export default reduxForm({
	validate,
	form: 'goalForm'
}) (
	connect(null, { createGoal }) (GoalNew)
);

// export default GoalNew = reduxForm({
// 	validate,
// 	form: 'goalForm'
// })(GoalNew);

// GoalNew = reduxForm({
// 	validate,
// 	form: 'goalForm'
// })(GoalNew);

// function mapStateToProps(state) {
// 	console.log('state: ', state);
// 	// console.log('state.form.goalForm: ', state.form.goalForm);
// 	// return { formValues: state.form.goalForm.values };
// }

// export default connect(mapStateToProps, actions)(GoalNew);

// <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
