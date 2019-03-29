import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { App } from '../App';
import Routes from '../Routes';

describe('<App />', () => {
	let props;

	beforeEach(() => {
		props = {
			App: {},
			redirect: sinon.spy()
		};
	});

	it('should match snapshot', () => {
		const wrapper = shallow(<App {...props} />);
		expect(wrapper).toBeDefined();
		expect(wrapper).toMatchSnapshot();
	});
});