import { all } from 'redux-saga/effects';
import { appSagas } from '../containers/App/saga';
import { transactionsSagas } from '../containers/Transactions/saga';

export default function * rootSaga() {
	yield all([
		...appSagas,
		...transactionsSagas
	]);
}