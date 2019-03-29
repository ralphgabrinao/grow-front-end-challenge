import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import App from '../containers/App/reducer';

export default combineReducers({
	App,
	form: formReducer
});