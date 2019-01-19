import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import GoalNew from './GoalNew';
const Teams = () => <h2>Teams</h2>
const TeamsNew = () => <h2>TeamsNew</h2>

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/goals" component={Dashboard} />
						<Route path="/goals/new" render={() => <GoalNew />} />
						<Route exact path="/teams" component={Teams} />
						<Route path="/teams/new" component={TeamsNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);