import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import GoalList from './GoalList';
import TeamList from './TeamList';

const Dashboard = () => {
	return (
		<div>
			<h3>Current Goals:</h3>
			<GoalList />
			<br />
			<div>
				<Link to="/goals/new" className="waves-effect waves-light btn">Make a new goal
				</Link>
			</div>
			<h3>Current Teams:</h3>
			<TeamList />
			<br />
			<div style={{ marginBottom: "20px"}}>
				<Link to="/teams/new" className="waves-effect waves-light btn">Make a new team
				</Link>
				<Link to="/teams/join" className="waves-effect waves-light btn right">Join a team
				</Link>
			</div>
		</div>		
	);
};

export default Dashboard;
