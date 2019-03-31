import { actionTypes } from './constants';

const actions = {
	fetchAccounts: () => {
		return {
			type: actionTypes.FETCH_ACCOUNTS
		};
	},
	fetchAccountsSuccess: payload => {
		return {
			type: actionTypes.FETCH_ACCOUNTS_SUCCESS,
			payload
		};
	},
	fetchAccountsFailure: () => {
		return {
			type: actionTypes.FETCH_ACCOUNTS_FAILURE
		};
	},
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