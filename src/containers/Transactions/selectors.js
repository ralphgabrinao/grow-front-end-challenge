import { createSelector } from 'reselect';

/* istanbul ignore next */
export const getAccountsData = state => state.Transactions.accountsData;
const getTransactionsData = state => state.Transactions.transactionsData;

export const makeSelectTransactionsData = createSelector(
	[getAccountsData, getTransactionsData],
	(accountsData, transactionsData) => {
		if (!transactionsData) return null;
		const accounts = accountsData ? accountsData.accounts : [];
		const transactions = transactionsData.transactions.map(t => {
			return {
				...t,
				category: t.category ? t.category : 'MISC',
				account: accounts ? accounts.filter(a => a.accountId === t.accountId)[0] : null
			};
		});
		return Object.assign(transactionsData, { transactions });
	}
);

const getFilteredTransactionsData = createSelector(
	// recalculate filtered transactions when either: 
	// 		accountsData changes, or
	// 		makeSelectTransactionsData alters transactionsData (by adding account to each transaction)
	[getAccountsData, makeSelectTransactionsData],
	(accountsData, transactionsData) => {
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