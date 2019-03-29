import React from 'react';
import { Route } from 'react-router-dom';

const AppliedRoute = ({ component: Comp, props: cProps, ...rest }) => {
	return (
		<Route 
			{...rest}
			render={props => <Comp {...props} {...cProps} />} 
		/>
	);
};

export default AppliedRoute;