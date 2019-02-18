import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import GoalNew from './GoalNew';
import TeamNew from './TeamNew';
import CommentNew from './CommentNew';
const Teams = () => <h2>Teams</h2>


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
						<Route path="/comments/new" render={() => <CommentNew />} />
						<Route exact path="/teams" component={Teams} />
						<Route path="/teams/new" render={() => <TeamNew />} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);