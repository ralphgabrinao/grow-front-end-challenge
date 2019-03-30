import { actionTypes } from './constants';
import { newState } from '../../utils/state';

const initialState = {
	data: null,
	isLoading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_TRANSACTIONS:
			return newState(state, { isLoading: true });
		case actionTypes.FETCH_TRANSACTIONS_SUCCESS:
			return newState(state, { data: action.payload, isLoading: false });
		case actionTypes.FETCH_TRANSACTIONS_FAILURE:
			return newState(state, { data: null, isLoading: false });
		default:
			return state;
	}
};

export default reducer;