// contains logic to render a single label and text input
// redux-form automatically watches for changes to the form 

import React from 'react';

// take in input handlers from redux form { input }, 
// wire them up to input element <input /> and render on GoalNew.js
// Only show the error if the form has been touched by the user.
export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: "5px" }} />
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};