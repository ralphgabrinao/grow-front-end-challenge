import reducer from '../reducer';
import { actionTypes } from '../constants';
import actions from '../actions';

describe('App reducer', () => {
	let initialState;

	beforeEach(() => {
		initialState = {};
	});

	test('should return the initial state by default', () => {
		expect(reducer(undefined, {}))
			.toEqual(initialState);
	});
});