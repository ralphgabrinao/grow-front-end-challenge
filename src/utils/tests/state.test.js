import { newState } from '../state';

test('uses spread operator to create new state object', () => {
	const value = 'Hello, World!';
	const prevState = { test: '', a: 1, b: 2, c: 3 };
	const newProps = { test: value };
	const expectedState = {...prevState, ...newProps};
	const result = newState(prevState, newProps);
	expect(result).toEqual(expectedState);
});

test('only modifies the specified new properties', () => {
	const value = 'Hello, World!';
	const prevState = { test: '', a: 1, b: 2, c: 3 };
	const expectedState = { test: value, a: 1, b: 2, c: 3 };
	const result = newState(prevState, { test: value });
	expect(result).toEqual(expectedState);
});