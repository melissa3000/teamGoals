import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

class Header extends Component {
	renderContent() {
		const { auth } = this.props;

		console.log(isEmpty(this.props.auth));
		if (auth === null) return;
		if (isEmpty(this.props.auth)) {
			return <li><a href="/auth/google">Login with Google</a></li>;
		}
		
		return [
			<li key="1" style={{ margin: '0 10px' }}>
				Points: {this.props.auth.points}
			</li>,
			<li key="2"><a href="/api/logout">Logout</a></li>
		];
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper teal lighten-2">
					<Link 
					to={isEmpty(this.props.auth) ? '/' : '/goals' } 
					className="left brand-logo"
					>
						Team Goals
					</Link>
					<ul className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	// console.log(auth)
	return { auth };
}

export default connect(mapStateToProps)(Header);