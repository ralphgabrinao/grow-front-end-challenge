import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../Routes';
import AppliedRoute from '../../../components/AppliedRoute/index';

describe('<Routes />', () => {
	it('should match snapshot', () => {
		const wrapper = shallow(<Routes />);
		expect(wrapper).toBeDefined();
		expect(wrapper).toMatchSnapshot();
	});

	it('should pass component and globalProps to all <AppliedRoute />', () => {
		const globalProps = { a: 1 };
		const wrapper = shallow(<Routes {...globalProps} />);
		const appRoutes = wrapper.find(AppliedRoute);
		appRoutes.forEach(node => {
			const nodeProps = node.props();
			expect(nodeProps.component).toBeInstanceOf(Function);
			expect(nodeProps.props).toEqual(globalProps);
		});
	});
});