import actions from '../actions';
import { actionTypes } from '../constants';

describe('App actions', () => {
	it(`should create an action for ${actionTypes.REDIRECT}`, () => {
		const location = { a: 1 };
		const expected = {
			type: actionTypes.REDIRECT,
			location
		};
		expect(actions.redirect(location)).toEqual(expected);
	});
});