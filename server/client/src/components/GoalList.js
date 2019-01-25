import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGoals } from '../actions';


class GoalList extends Component {
	componentDidMount() {
		this.props.fetchGoals();
	}
	
	renderGoals() {
		return this.props.goals.map(goal => {
			return (
				<div className="card darken-1" key={goal.goalId}>
					<div className="card-content">
						<p>
							{goal.goal}
						</p>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.renderGoals()}
			</div>
		);
	}
}

function mapStateToProps( { goals }) {
	return { goals };
}

export default connect(mapStateToProps, { fetchGoals })(GoalList);

