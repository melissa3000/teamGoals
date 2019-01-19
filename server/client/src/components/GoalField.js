// contains logic to render a single label and text input
// redux-form automatically watches for changes to the form 

import React from 'react';

// take in input handlers from redux form { input }, 
// wire them up to input element <input /> and render on GoalNew.js
export default ({ input, label }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
		</div>
	);
};