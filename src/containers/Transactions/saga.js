import { call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from './constants';
import actions from './actions';
import { client, endpoints } from '../../utils/api';

export function * fetchAccounts() {
	try {
		const response = yield call(client.get, endpoints.accounts);
		yield put(actions.fetchAccountsSuccess(response.data));
	}
	catch(e) {
		yield put(actions.fetchAccountsFailure());
	}
}

export function * fetchCategories() {
	try {
		const response = yield call(client.get, endpoints.categories);
		const categories = response.data ? response.data.categories : [];
		yield put(actions.fetchCategoriesSuccess(categories));

		const filter = {
			key: 'category',
			options: {}
		}

		categories.forEach(c => {
			filter.options[c.toLowerCase()] = true;
		});
		
		yield put(actions.addNewFilter(filter));

	}
	catch(e) {
		yield put(actions.fetchCategoriesFailure());
	}
}

export function * fetchTransactions() {
	try {
		const response = yield call(client.get, endpoints.transactions);
		yield put(actions.fetchTransactionsSuccess(response.data));
	}
	catch(e) {
		yield put(actions.fetchTransactionsFailure());
	}
}

export const transactionsSagas = [
	takeEvery(actionTypes.FETCH_ACCOUNTS, fetchAccounts),
	takeEvery(actionTypes.FETCH_CATEGORIES, fetchCategories),
	takeEvery(actionTypes.FETCH_TRANSACTIONS, fetchTransactions)
];