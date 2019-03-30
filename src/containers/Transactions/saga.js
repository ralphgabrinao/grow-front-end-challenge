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
	takeEvery(actionTypes.FETCH_TRANSACTIONS, fetchTransactions)
];