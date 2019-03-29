export const newState = (prevState, newProperties) => {
	return {...prevState, ...newProperties};
};