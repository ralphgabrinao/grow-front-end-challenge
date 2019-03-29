import { actionTypes } from './constants';

const actions = {
	redirect: location => {
		return {
			type: actionTypes.REDIRECT,
			location
		};
	}
};

export default actions;