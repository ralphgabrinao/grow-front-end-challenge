import sinon from 'sinon';
import { runSaga } from 'redux-saga';
import history from '../../../history';
import { redirect } from '../saga';

it('should redirect to given location', async () => {
	const dispatched = [];

	const stub = sinon.stub(history, 'push');
	const actionArg = {
		location: 'hello'
	};

	await runSaga({
		dispatch: action => dispatched.push(action)
	}, redirect, actionArg).done;

	expect(stub.getCall(0).args[0]).toEqual('hello');
	expect(dispatched).toEqual([]);
});