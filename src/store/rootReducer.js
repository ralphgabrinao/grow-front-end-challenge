import { combineReducers } from 'redux';
import App from '../containers/App/reducer';
import Transactions from '../containers/Transactions/reducer';

export default combineReducers({
	App,
	Transactions
});