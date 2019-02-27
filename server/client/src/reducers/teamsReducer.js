import { FETCH_TEAMS, FETCH_TEAM_GOALS } from '../actions/types';

export default function(state = { teams: [], teamGoals: [] }, action){
	switch (action.type) {
		case FETCH_TEAMS:
			return {...state, teams: action.payload};
		case FETCH_TEAM_GOALS:
			return {...state, teamGoals: action.payload}
		default:
			return state;
	}
}