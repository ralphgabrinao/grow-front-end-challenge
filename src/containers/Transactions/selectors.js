import { createSelector } from 'reselect';

/* istanbul ignore next */
const getAccountsData = state => state.Transactions.accountsData;
const getTransactionsData = state => state.Transactions.transactionsData;

export const makeSelectAccountsData = createSelector(
	getAccountsData,
	data => data
);

export const makeSelectTransactionsData = createSelector(
	[makeSelectAccountsData, getTransactionsData],
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

const getFilteredTransactionsData = createSelector(
	makeSelectTransactionsData,
	transactionsData => {
		if (!transactionsData) return null;
		return transactionsData.transactions;
	}
);

export const getGroupedTransactions = createSelector(
	getFilteredTransactionsData,
	transactions => {
		if (!transactions) return [];
		const transactionDates = Array.from(new Set(transactions.map(t => t.transactionDate)));
		return transactionDates.map(d => {
			return {
				date: d, 
				transactions: transactions.filter(t => t.transactionDate === d) } 
		});
	}
);