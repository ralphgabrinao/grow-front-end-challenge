import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';

export class Transactions extends React.Component {
	componentDidMount() {
		this.props.fetchTransactions();
	}

	render() {
		const state = this.props.Transactions;
		console.log(state.data);
		return (
			<div>{state.data ? state.data.transactions[0].transactionId : 'No data to show.'}</div>
		);
	}
}

Transactions.propTypes = {
	Transactions: PropTypes.any
};

/* istanbul ignore next */
const mapStateToProps = state => {
	return {
		Transactions: state.Transactions
	};
};


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
	fetchTransactions: () => dispatch(actions.fetchTransactions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);