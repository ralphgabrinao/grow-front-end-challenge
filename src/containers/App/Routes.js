import React from 'react';
import { Router } from 'react-router-dom';
import history from '../../history';
import AppliedRoute from '../../components/AppliedRoute';
import Transactions from '../Transactions/Transactions';

const Routes = globalProps => {
	return (
		<Router history={history}>
			<div>
				<AppliedRoute exact path='/' component={Transactions} props={globalProps} />
			</div>
		</Router>
	);
};

export default Routes;