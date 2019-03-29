import React from 'react';
import { Router } from 'react-router-dom';
import history from '../../history';

const Routes = globalProps => {
	return (
		<Router history={history}>
			<div>
				{/* <AppliedRoute exact path='/' component={Home} props={globalProps} /> */}
			</div>
		</Router>
	);
};

export default Routes;