import axios from 'axios';
import { FETCH_USER, FETCH_GOALS, CREATE_GOAL, CREATE_TEAM, FETCH_TEAMS, CREATE_COMMENT, FETCH_COMMENTS, JOIN_TEAM, UPDATE_POINTS, FETCH_TEAM_GOALS } from './types';


export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data })
};

export const createGoal = values => async dispatch => {
	const res = await axios.post('/api/add_goal', values);

	dispatch({ type: CREATE_GOAL, payload: res.data });
	return res;
};

export const fetchGoals = () => async dispatch => {
	const res = await axios.get('/api/user_goals');

	dispatch({ type: FETCH_GOALS, payload: res.data });
};

export const createTeam = values => async dispatch => {
	const res = await axios.post('/api/add_team', values);

	dispatch({ type: CREATE_TEAM, payload: res.data });
};

export const fetchTeams = () => async dispatch => {
	const res = await axios.get('/api/user_teams');

	dispatch({ type: FETCH_TEAMS, payload: res.data });
};

export const joinTeam = values => async dispatch => {
	const res = await axios.post('/api/join_team', values);

	dispatch({ type: JOIN_TEAM, payload: res.data });
};

export const createComment = values => async dispatch => {
	const res = await axios.post('/api/add_comment', values);

	dispatch({ type: CREATE_COMMENT, payload: res.data });
};

export const fetchComments = goalId => async dispatch => {
	const res = await axios.post('/api/get_comments', goalId);

	dispatch({ type: FETCH_COMMENTS, payload: res.data });
};

export const updatePoints = value => dispatch => {
	// debugger;
	dispatch({ type: UPDATE_POINTS, payload: value})
}

export const fetchTeamGoals = teamId => async dispatch => {
	const res = await axios.post('/api/get_team_goals', { teamId: teamId });

	dispatch({ type: FETCH_TEAM_GOALS, payload:res.data})
}