import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList'


export default ({ input, data, valueField, textField }) => {
	return (
		<div>
			<DropdownList {...input}
			data={data}
			valueField={valueField}
			textField={textField}
			onchange={input.onChange} />
		</div>
	);
};