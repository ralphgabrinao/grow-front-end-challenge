import { actionTypes } from './constants';

const actions = {
	addNewFilter: payload => {
		return {
			type: actionTypes.ADD_NEW_FILTER,
			payload
		}
	},
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
	fetchCategories: () => {
		return {
			type: actionTypes.FETCH_CATEGORIES
		};
	},
	fetchCategoriesSuccess: payload => {
		return {
			type: actionTypes.FETCH_CATEGORIES_SUCCESS,
			payload
		};
	},
	fetchCategoriesFailure: () => {
		return {
			type: actionTypes.FETCH_CATEGORIES_FAILURE
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
	},
	filterAccount: payload => {
		return {
			type: actionTypes.FILTER_ACCOUNT,
			payload
		}
	},
	toggleCategory: payload => {
		return {
			type: actionTypes.TOGGLE_CATEGORY,
			payload
		}
	}
};

export default actions;