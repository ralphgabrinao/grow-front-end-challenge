import { createSelector } from 'reselect';
import { allAccounts, defaultSortOptions } from './constants';

/* istanbul ignore next */
export const getAccountsData = state => state.Transactions.accountsData;
export const getCategories = state => state.Transactions.categories;
const getFilters = state => state.Transactions.filters;
const getSort = state => state.Transactions.sort;
const getTransactionsData = state => state.Transactions.transactionsData;

const arrSum = arr => arr.reduce((a,b) => a + b, 0);
const formatCategory = str => str.replace(/[_]/g, ' ');

export const makeSelectFilters = createSelector(
	[getFilters, getAccountsData, getCategories],
	(filters, accountsData, categories) => {
		if (!filters.account) {
			if (accountsData) {
				const filter = allAccounts;
				filter.balance = 0;
				filter.balance = arrSum(accountsData.accounts.map(a => a.balance));
				filters.account = filter;
			}
		}

		if (!filters.category) {
			if (categories.length > 0) {
				const filter = {};
				categories.forEach(c => { filter[formatCategory(c)] = true; });
				filter.MISC = true;
				filters.category = filter;
			}
		}

		if (!filters.date) {
			filters.date = {
				from: '',
				to: ''
			}
		}

		return filters;
	}
);

export const makeSelectSort = createSelector(
	[getSort],
	(sort) => {
		if (!sort.value) {
			sort.options = defaultSortOptions;
			sort.value = defaultSortOptions[0];
		}
		return sort;
	}
);

const stringToDate = (str) => {
	const split = str.split('-');
	return new Date(split[0], split[1], split[2]);
}

export const makeSelectTransactionsData = createSelector(
	[getAccountsData, getTransactionsData],
	(accountsData, transactionsData) => {
		if (!transactionsData) return null;
		const accounts = accountsData ? accountsData.accounts : [];
		const transactions = transactionsData.transactions.map(t => {
			const date = stringToDate(t.transactionDate);
			return {
				...t,
				transactionDateTime: date,
				category: t.category ? formatCategory(t.category) : 'MISC',
				account: accounts ? accounts.filter(a => a.accountId === t.accountId)[0] : null
			};
		});
		return Object.assign(transactionsData, { transactions });
	}
);

const getFilteredTransactions = createSelector(
	[getAccountsData, makeSelectTransactionsData, makeSelectFilters],
	(accountsData, transactionsData, filters) => {
		if (!transactionsData) return null;
		const transactions = transactionsData.transactions
			.filter(t =>
				filters.account && (!filters.account.accountId || filters.account.accountId === t.account.accountId) &&
				filters.category && filters.category[t.category] &&
				filters.date && (filters.date.from.length === 0 || stringToDate(filters.date.from) <= t.transactionDateTime) && (filters.date.to.length === 0 || stringToDate(filters.date.to) >= t.transactionDateTime));
		return transactions;
	}
);

const getSortedTransactions = createSelector(
	[getFilteredTransactions, makeSelectSort],
	(transactions, sort) => {
		if (!transactions || !sort.value) return transactions;
		const arr = Array.from(transactions);
		arr.sort(sort.value.comparer);
		return arr;
	}
);

export const getGroupedTransactions = createSelector(
	getSortedTransactions,
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

export const getTransactionSummary = createSelector(
	[getFilters, getFilteredTransactions],
	(filters, transactions) => {
		if (!filters || !filters.category || !transactions) return [];
		let categoryCount = Object.entries(filters.category).map(c => {
			const value = transactions.filter(t => t.category === c[0]).length;
			return { title: c[0], value };
		});
		categoryCount.sort((a, b) => b.value - a.value);
		let cut = 1;
		while (cut < 4 && categoryCount[cut] && categoryCount[cut].value > 0)
			cut++;
		const top = categoryCount.slice(0,cut);
		const others = { title: 'Other', value: arrSum(categoryCount.slice(cut).map(x => x.value)) };
		const summary = {
			categories: others.value > 0 ? [...top, others] : top,
			totalValue: transactions.length
		}
		return summary;
	}
);