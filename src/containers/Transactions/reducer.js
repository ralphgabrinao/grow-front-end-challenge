import { actionTypes } from './constants';
import { newState } from '../../utils/state';

const initialState = {
	accountsData: null,
	transactionsData: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ACCOUNTS_SUCCESS:
			return newState(state, { accountsData: action.payload });
		case actionTypes.FETCH_ACCOUNTS_FAILURE:
			return newState(state, { accountsData: null });

		case actionTypes.FETCH_TRANSACTIONS_SUCCESS:
			return newState(state, { transactionsData: action.payload });
		case actionTypes.FETCH_TRANSACTIONS_FAILURE:
			return newState(state, { transactionsData: null });
			
		default:
			return state;
	}
};

export default reducer;