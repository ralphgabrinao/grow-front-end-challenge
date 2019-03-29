import { createSelector } from 'reselect';

/* istanbul ignore next */
const getAppState = state => state.App;

export const makeSelectApp = createSelector(
	getAppState,
	appState => { return appState; }
);