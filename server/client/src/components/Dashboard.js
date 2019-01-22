import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
	return (
		<div>
			Dashboard
			Current Goals:
			<br />
			<div>
				<Link to="/goals/new" className="waves-effect waves-light btn">Make a new goal
				</Link>
			</div>
		</div>		
	);
};

export default Dashboard;