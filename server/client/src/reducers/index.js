import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import goalsReducer from './goalsReducer';
import teamsReducer from './teamsReducer';
import commentsReducer from './commentsReducer';

// the auth part of state is created by the authReducer
export default combineReducers({
	auth: authReducer,
	form: reduxForm, 
	goals: goalsReducer,
	teams: teamsReducer,
	comments: commentsReducer
});