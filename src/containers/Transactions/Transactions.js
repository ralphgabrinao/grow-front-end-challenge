import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';
import { TransactionsList } from './TransactionsList';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { getGroupedTransactions, makeSelectTransactionsData, getAccountsData } from './selectors';

const Wrapper = styled.div`
	height: 100%;
	padding: 40px;
`;

const renderGridItem = ({ sm, renderComponent }) => {
	return (
		<Grid item sm={sm}>
			<Paper square={false}>
				{renderComponent()}
			</Paper>
		</Grid>
	);
}

export class Transactions extends React.Component {
	componentDidMount() {
		this.props.fetchAccounts();
		this.props.fetchTransactions();
	}

	render() {
		const state = this.props.Transactions;
		const transactions = state.filteredTransactions;
		const transactionsList = { sm: 6, renderComponent: () => <TransactionsList transactions={transactions} /> };
		return (
			<Wrapper>
				<Grid container spacing={24} justify='center'>
					{renderGridItem(transactionsList)}
				</Grid>
			</Wrapper>
		);
	}
}

Transactions.propTypes = {
	Transactions: PropTypes.shape({
		accountsData: PropTypes.object,
		transactionsData: PropTypes.object,
		filteredTransactions: PropTypes.array,
		fetchAccounts: PropTypes.func,
		fetchTransactions: PropTypes.func
	})
};

/* istanbul ignore next */
const mapStateToProps = state => {
	return {
		Transactions: {
			accountsData: getAccountsData(state),
			transactionsData: makeSelectTransactionsData(state),
			filteredTransactions: getGroupedTransactions(state)
		}
	};
};


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
	fetchAccounts: () => dispatch(actions.fetchAccounts()),
	fetchTransactions: () => dispatch(actions.fetchTransactions())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);