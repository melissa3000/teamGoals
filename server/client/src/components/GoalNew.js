import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import GoalField from './GoalField';
import GoalDropdown from './GoalDropdown';

import 'react-widgets/dist/css/react-widgets.css'

let colors = [ { color: 'Red', value: 'ff0000' },
{ color: 'Green', value: '00ff00' },
{ color: 'Blue', value: '0000ff' } ];


class GoalNew extends Component {
	renderFields() {
		return (
			<div>
				<div>
					<Field 
						label="Goal Title" 
						type="text"
						name="goalText" 
						component={GoalField} 
					/>
				</div>

				<div>
        	<label>Would you like to share your goal with a team?</label>
					<Field 
						name="teamName" 
						component={GoalDropdown}
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
			<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
				{this.renderFields()}
				<button type="submit">Submit</button>
			</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'goalForm'
})(GoalNew);