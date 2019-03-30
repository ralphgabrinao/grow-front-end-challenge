import { actionTypes } from './constants';

const actions = {
	fetchTransactions: () => {
		return {
			type: actionTypes.FETCH_TRANSACTIONS
		};
	},
	fetchTransactionsSuccess: payload => {
		return {
			type: actionTypes.FETCH_TRANSACTIONS_SUCCESS,
			payload
		};
	},
	fetchTransactionsFailure: () => {
		return {
			type: actionTypes.FETCH_TRANSACTIONS_FAILURE
		};
	}
};

export default actions;