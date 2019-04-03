import { createSelector } from 'reselect';
import { allAccounts } from './constants';

/* istanbul ignore next */
export const getAccountsData = state => state.Transactions.accountsData;
export const getCategories = state => state.Transactions.categories;
const getFilters = state => state.Transactions.filters;
export const getSortOptions = state => state.Transactions.sortOptions;
export const getSortValue = state => state.Transactions.sortValue;
const getTransactionsData = state => state.Transactions.transactionsData;

export const makeSelectFilters = createSelector(
	[getFilters, getAccountsData, getCategories],
	(filters, accountsData, categories) => {
		if (!filters.account) {
			if (accountsData) {
				const arrSum = arr => arr.reduce((a,b) => a + b, 0);
				const filter = allAccounts;
				filter.balance = arrSum(accountsData.accounts.map(a => a.balance));
				filters.account = filter;
			}
		}

		if (!filters.category) {
			if (categories.length > 0) {
				const filter = {};
				categories.forEach(c => { filter[c] = true; });
				filter.MISC = true;
				filters.category = filter;
			}
		}

		return filters;
	}
);

export const makeSelectTransactionsData = createSelector(
	[getAccountsData, getTransactionsData],
	(accountsData, transactionsData) => {
		if (!transactionsData) return null;
		const accounts = accountsData ? accountsData.accounts : [];
		const transactions = transactionsData.transactions.map(t => {
			const split = t.transactionDate.split('-');
			const date = new Date(split[0], split[1], split[2]);
			return {
				...t,
				transactionDateTime: date,
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
	// 		makeSelectTransactionsData alters transactionsData (by adding account to each transaction), or
	// 		the filters change
	[getAccountsData, makeSelectTransactionsData, getFilters, getSortValue],
	(accountsData, transactionsData, filters, sortValue) => {
		if (!transactionsData) return null;
		const transactions = transactionsData.transactions
			.filter(t => 
				filters.account && (!filters.account.accountId || filters.account.accountId === t.account.accountId) &&
				filters.category && filters.category[t.category]);
		return transactions;
	}
);

const getSortedTransactiionsData = createSelector(
	[getFilteredTransactionsData, getSortValue],
	(transactions, sortValue) => {		
		if (!transactions || !sortValue) return transactions;
		transactions.sort(sortValue.comparer);
		return transactions;
	}
);

export const getGroupedTransactions = createSelector(
	getSortedTransactiionsData,
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