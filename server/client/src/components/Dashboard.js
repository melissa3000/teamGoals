import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';
import GoalList from './GoalList';

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
		</div>		
	);
};

export default Dashboard;