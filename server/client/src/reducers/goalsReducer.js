import { FETCH_GOALS } from '../actions/types';

export default function(state = [], action){
	switch (action.type) {
		case FETCH_GOALS:
			return action.payload;
		default:
			return state;
	}
}