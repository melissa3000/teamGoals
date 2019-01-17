import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

const Landing = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>
				Welcome to Team Goals!
			</h1>
			Current Goals:
			<br />
			<button className="btn waves-effect waves-light" type="submit" name="action">Make a new goal for yourself
    <i className="material-icons right"></i>
  </button>
		</div>
	);
};

export default Landing;