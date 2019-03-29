import { makeSelectApp } from '../selectors';

describe('App selectors', () => {
	test('should return the state as an object', () => {
		const selected = makeSelectApp.resultFunc({ App: 'some text' });
		expect(selected).toEqual({ App: 'some text' });
	});
});