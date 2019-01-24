import axios from 'axios';
import { FETCH_USER, FETCH_GOALS, CREATE_GOAL } from './types';


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


export const createGoal = values => async dispatch => {
	const res = await axios.post('/api/add_goal', values);

	dispatch({ type: CREATE_GOAL, payload: res.data });
};



export const fetchGoals = () => async dispatch => {
	const res = await axios.get('/api/user_goals');

	dispatch({ type: FETCH_GOALS, payload: res.data });
};