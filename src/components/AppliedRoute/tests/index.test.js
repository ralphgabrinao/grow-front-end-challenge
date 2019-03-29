import React from 'react';
import AppliedRoute from '../index';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';

describe('<AppliedRoute />', () => {
	it('should be defined', () => {
		expect(AppliedRoute).toBeDefined();
	});

	it('should apply props correctly', () => {
		const props = {
			component: () => { return (<div></div>); },
			props: { a: 1 },
			moreProps: { b: 1 }
		};
		const wrapper = shallow(<AppliedRoute {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render component', () => {
		const props = {
			component: () => { return (<div></div>); },
			props: { a: 1 },
			moreProps: { b: 1 }
		};
		const wrapper = shallow(<AppliedRoute {...props} />);
		const route = wrapper.find(Route);
		const comp = route.props().render();
		// TODO: more meaningful assertion
		expect(comp).toBeDefined();
		expect(comp.props.a).toEqual(1);
	});
});