import { createSelector } from 'reselect';

/* istanbul ignore next */
const getAccountsData = state => state.Transactions.accountsData;
const getTransactionsData = state => state.Transactions.transactionsData;

export const getMappedTransactionsData = createSelector(
	[getAccountsData, getTransactionsData],
	(accountsData, transactionsData) => {
		if (!transactionsData) return null;
		const accounts = accountsData ? accountsData.accounts : [];
		const transactions = transactionsData.transactions.map(t => {
			return {
				...t,
				account: accounts ? accounts.filter(a => a.accountId === t.accountId)[0] : null
			};
		});
		//console.log('Recalculating transactions...');
		return Object.assign(transactionsData, { transactions });
	}
);