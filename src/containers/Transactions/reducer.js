import { actionTypes } from './constants';
import { newState } from '../../utils/state';

const initialState = {
	accountsData: null,
	categories: [],
	transactionsData: null,
	filteredTransactions: [],
	filters: {},
	sort: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_NEW_FILTER:
			return newState(state, { filters: {...state.filters, [action.payload.key]: action.payload.options } });

		case actionTypes.FETCH_ACCOUNTS_SUCCESS:
			return newState(state, { accountsData: action.payload });
		case actionTypes.FETCH_ACCOUNTS_FAILURE:
			return newState(state, { accountsData: null });

		case actionTypes.FETCH_CATEGORIES_SUCCESS:
			return newState(state, { categories: action.payload });
		case actionTypes.FETCH_CATEGORIES_FAILURE:
			return newState(state, { categories: [] });

		case actionTypes.FETCH_TRANSACTIONS_SUCCESS:
			return newState(state, { transactionsData: action.payload });
		case actionTypes.FETCH_TRANSACTIONS_FAILURE:
			return newState(state, { transactionsData: null });

		case actionTypes.FILTER_ACCOUNT:
			return newState(state, { filters: {
				...state.filters,
				account: action.payload
			}});

		case actionTypes.FILTER_BY_DATE_FROM:
			return newState(state, { filters: {
				...state.filters,
				date: {
					...state.filters.date,
					from: action.payload
				}
			}});

		case actionTypes.FILTER_BY_DATE_TO:
			return newState(state, { filters: {
				...state.filters,
				date: {
					...state.filters.date,
					to: action.payload
				}
			}});

		case actionTypes.RESET_ALL_FILTERS:
			return newState(state, { filters: {}, sort: {} });

		case actionTypes.SORT_TRANSACTIONS:
			return newState(state, { sort: { ...state.sort, value: action.payload }});

		case actionTypes.TOGGLE_CATEGORY:
			return newState(state, { filters: {
				...state.filters,
				category: {
					...state.filters.category,
					[action.payload]: !state.filters.category[action.payload]
				}
			}});
		default:
			return state;
	}
};

export default reducer;