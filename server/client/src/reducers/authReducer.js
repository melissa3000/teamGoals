import { FETCH_USER, UPDATE_POINTS } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			// return user object if logged in or false if user not logged in
			return action.payload || false;
		case UPDATE_POINTS:
			return {...state, points: action.payload}
		default:
			return state;
	}
}