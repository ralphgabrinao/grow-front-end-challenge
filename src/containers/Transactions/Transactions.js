import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';
import { CategoriesFilter } from './CategoriesFilter';
import { TransactionsList } from './TransactionsList';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { 
	getGroupedTransactions,
	makeSelectTransactionsData,
	getAccountsData,
	getCategories,
	getFilters
} from './selectors';

const Wrapper = styled.div`
	height: 100%;
	padding: 40px;
`;

const renderGridItem = ({ sm, renderComponent }) => {
	return (
		<Grid item sm={sm}>
			<Paper square={false} elevation={1}>
				{renderComponent()}
			</Paper>
		</Grid>
	);
}

export class Transactions extends React.Component {
	componentDidMount() {
		this.props.fetchAccounts();
		this.props.fetchTransactions();
		this.props.fetchCategories();
	}

	render() {
		const state = this.props.Transactions;
		const transactions = state.filteredTransactions;
		const categoriesFilter = {
			sm: 3,
			renderComponent: () => 
				<CategoriesFilter
					options={state.filters.category}
					handleChange={() => this.props.toggleCategory} /> }
		const transactionsList = { sm: 6, renderComponent: () => <TransactionsList transactions={transactions} /> };
		return (
			<Wrapper>
				<Grid container spacing={24}>
					{renderGridItem(categoriesFilter)}
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
			categories: getCategories(state),
			transactionsData: makeSelectTransactionsData(state),
			filteredTransactions: getGroupedTransactions(state),
			filters: getFilters(state)
		}
	};
};


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
	fetchAccounts: () => dispatch(actions.fetchAccounts()),
	fetchCategories: () => dispatch(actions.fetchCategories()),
	fetchTransactions: () => dispatch(actions.fetchTransactions()),
	toggleCategory: (event) => dispatch(actions.toggleCategory(event.target.value)),
	toggleAllCategories: () => dispatch(actions.toggleAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);