import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware(rootSaga);
	const store = createStore(
		rootReducer,
		applyMiddleware(sagaMiddleware)
	);
	sagaMiddleware.run(rootSaga);
	return store;
}