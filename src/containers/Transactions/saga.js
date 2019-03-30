import { call, put, takeEvery } from 'redux-saga/effects';
import { actionTypes } from './constants';
import actions from './actions';
import { client, endpoints } from '../../utils/api';

export function * fetchTransactions() {
	try {
		const result = yield call(client.get, endpoints.transactions);
		yield put(actions.fetchTransactionsSuccess(result.data));
	}
	catch(e) {
		yield put(actions.fetchTransactionsFailure());
	}
}

export const transactionsSagas = [
	takeEvery(actionTypes.FETCH_TRANSACTIONS, fetchTransactions)
];