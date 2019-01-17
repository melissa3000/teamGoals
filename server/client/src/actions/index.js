import axios from 'axios';
import { FETCH_USER } from './types';


export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data })
};

// action creator before refactor, does the same as the code immediately above
// export const fetchUser = () => {
// 	return function(dispatch) {
// 		axios.get('/api/current_user')
// 			.then(res => dispatch({ type: FETCH_USER, payload: res }))
// 	};
// };

export const createGoal = () => async dispatch => {
	const res = await axios.post('/api/add_goal');

	dispatch({ type: FETCH_USER, payload: res.data });
};