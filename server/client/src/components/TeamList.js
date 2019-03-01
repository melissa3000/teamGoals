import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTeams, fetchTeamGoals } from '../actions';


class TeamList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showGoals: false, 
		};
	}

	componentDidMount() {
		this.props.fetchTeams();
	}
	
	renderGoals(teamId) {
		let current_goal = this.props.teamGoals.map((goal) => {
			// console.log(goal.goal)
			if (goal.TeamId !== teamId) {
				return null
			} 
			return(
				<div key={goal.goalId}>
					<p>{goal.goal}</p>
				</div>
			)
		})
		return current_goal
	}
	
	handleClick = (teamId) => {
		this.setState(prevState => {
			return ({[`showGoals_${teamId
			}`]: !prevState[`showGoals_${teamId}`]})
		})
		this.props.fetchTeamGoals(teamId);
	}

	renderTeams() {
		// console.log(this.props.teams)
		if (!this.props.teams) {
			return null;
		}
		return this.props.teams.map(team => {
			return (
				<div className="card darken-1" key={team.teamID} onClick={() => this.handleClick(team.teamID)}>
					<div className="card-content">
						<p>
							{team.teamName}
						</p>
						<div>
							{this.state[`showGoals_${team.teamID}`] && this.renderGoals(team.teamID)}
						</div>
					</div>

				</div>
			);
		});
	}

	render() {
		return (
			<div>
				{this.renderTeams()}
			</div>
		);
	}
}

function mapStateToProps( { teams }) {
	console.log(teams);
	return { teams: teams.teams, teamGoals: teams.teamGoals };
}

export default connect(mapStateToProps, { fetchTeams, fetchTeamGoals })(TeamList);