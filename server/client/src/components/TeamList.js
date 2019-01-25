import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTeams } from '../actions';


class TeamList extends Component {
	componentDidMount() {
		this.props.fetchTeams();
	}
	
	renderTeams() {
		return this.props.teams.map(team => {
			return (
				<div className="card darken-1" key={team.teamID}>
					<div className="card-content">
						<p>
							{team.teamName}
						</p>
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
	return { teams };
}

export default connect(mapStateToProps, { fetchTeams })(TeamList);

