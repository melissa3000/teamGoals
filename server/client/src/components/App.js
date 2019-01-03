import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>
const Goals = () => <h2>Goals</h2>
const GoalsNew = () => <h2>GoalsNew</h2>
const Landing = () => <h2>Landing</h2>
const Teams = () => <h2>Teams</h2>
const TeamsNew = () => <h2>TeamsNew</h2>

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path="/" component={Landing} />
					<Route exact path="/goals" component={Goals} />
					<Route path="/goals/new" component={GoalsNew} />
					<Route exact path="/teams" component={Teams} />
					<Route path="/teams/new" component={TeamsNew} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;