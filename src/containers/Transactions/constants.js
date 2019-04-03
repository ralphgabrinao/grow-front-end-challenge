export const actionTypes = {
	ADD_NEW_FILTER: 'TRANSACTIONS/ADD_NEW_FILTER',

	FETCH_ACCOUNTS: 'TRANSACTIONS/FETCH_ACCOUNTS',
	FETCH_ACCOUNTS_SUCCESS: 'TRANSACTIONS/FETCH_ACCOUNTS_SUCCESS',
	FETCH_ACCOUNTS_FAILURE: 'TRANSACTIONS/FETCH_ACCOUNTS_FAILURE',

	FETCH_CATEGORIES: 'TRANSACTIONS/FETCH_CATEGORIES',
	FETCH_CATEGORIES_SUCCESS: 'TRANSACTIONS/FETCH_CATEGORIES_SUCCESS',
	FETCH_CATEGORIES_FAILURE: 'TRANSACTIONS/FETCH_CATEGORIES_FAILURE',

	FETCH_TRANSACTIONS: 'TRANSACTIONS/FETCH_TRANSACTIONS',
	FETCH_TRANSACTIONS_SUCCESS: 'TRANSACTIONS/FETCH_TRANSACTIONS_SUCCESS',
	FETCH_TRANSACTIONS_FAILURE: 'TRANSACTIONS/FETCH_TRANSACTIONS_FAILURE',

	FILTER_ACCOUNT: 'TRANSACTIONS/FILTER_ACCOUNT',
	
	RESET_ALL_FILTERS: 'TRANSACTIONS/RESET_ALL_FILTERS',

	SORT_TRANSACTIONS: 'TRANSACTIONS/SORT_TRANSACTIONS',

	TOGGLE_CATEGORY: 'TRANSACTIONS/TOGGLE_CATEGORY'
};

export const allAccounts = { accountName: 'All Accounts', accountId: '', balance: 0 };
export const defaultSortOptions = [
	{ key: 1, label: 'New to old', comparer: (a, b) =>  { return b.transactionDateTime - a.transactionDateTime }},
	{ key: 2, label: 'Old to new', comparer: (a, b) =>  { return a.transactionDateTime - b.transactionDateTime }}
];