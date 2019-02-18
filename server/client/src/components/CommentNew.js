import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoalField from './GoalField';
import { createComment } from '../actions';
// import { fetchGoals } from '../actions';
import PropTypes from 'prop-types';

import 'react-widgets/dist/css/react-widgets.css'


class CommentNew extends Component {
	// constructor(props) {
	// 	super(props);
	// // // 	console.log(props)
	// // // 	this.state = {
	// // // 		goals: this.props.goals
	// 	}
		
	// }
	// componentDidMount() {
	// 	// this.props.fetchGoals();
		
	// }
	componentWillReceiveProps(nextProps){
		console.log("location", nextProps.location)
	}
	
	renderFields() {
		console.log(this.props.location)
		console.log("state", this.state)
		console.log(this.props.goalId)
		console.log(this.props)
		// console.log(this.props.location.state.goalId)
		// const {id} = this.props.goals.match.params
		// console.log(id)
		// let goals = this.props.goals;
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
		console.log(values)
		// this.props.createComment(values, () => {
		// 	this.props.history.push('/goals');
		// });
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

CommentNew.propTypes = {
	goalId: PropTypes.string
};

function validate(values) {
	const errors = {};

	if (!values.comment) {
		errors.comment = "Please enter a comment";
	}
	return errors;
}

function mapStateToProps( { goals }) {
	return { goals };
}

export default reduxForm({
	validate,
	form: 'commentForm'
}) (
	connect(mapStateToProps, { createComment}) (CommentNew)
);


