import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

// the auth part of state is created by the authReducer
export default combineReducers({
	auth: authReducer,
	form: reduxForm
});