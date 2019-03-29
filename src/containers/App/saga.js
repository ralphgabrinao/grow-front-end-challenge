import { call, takeEvery } from 'redux-saga/effects';
import { actionTypes } from './constants';
import history from '../../history';

export function * redirect(action) {
	yield call(history.push, action.location);
}

export const appSagas = [
	takeEvery(actionTypes.REDIRECT, redirect)
];