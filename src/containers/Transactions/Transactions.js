import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';
import { AccountDetails } from './AccountDetails';
import { AccountFilter } from './AccountFilter';
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
	max-width: 1400px;
	padding: 40px 150px;
`;

const Header = styled.div`
	font-size: 14px;
	font-weight: 600;
	letter-spacing: 2px;
	opacity: 0.7;
	padding: 24px 24px 0px 24px;
`;

const Divider = styled.div`
	height: 20px;
`;

const renderGridItem = ({ header, renderComponent }) => {
	return (
		<Grid item sm={12}>
			<Paper square={false} elevation={1}>
				{header ? <Header>{header}</Header> : ''}
				{renderComponent()}
			</Paper>
			<Divider />
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
		const accounts = state.accountsData ? state.accountsData.accounts : [];
		const accountFilter = state.filters ? state.filters.account : null;
		const accountDetails = { renderComponent: () => <AccountDetails account={accountFilter}></AccountDetails> }
		const categoriesFilter = {
			header: 'Categories',
			renderComponent: () => 
				<CategoriesFilter
					options={state.filters.category}
					handleChange={() => this.props.toggleCategory} /> }
		const transactionsList = { header: 'Activity', renderComponent: () => <TransactionsList transactions={transactions} /> };
		return (
			<Wrapper>
				<Grid container spacing={24} justify='center'>
					<Grid item sm={12}>
						<AccountFilter
							accounts={accounts}
							selected={accountFilter}
							handleChange={() => this.props.filterAccount} />
					</Grid>
					<Grid item sm={4}>
						{renderGridItem(accountDetails)}
						{renderGridItem(categoriesFilter)}
					</Grid>
					<Grid item sm={8}>
						{renderGridItem(transactionsList)}
					</Grid>
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
	filterAccount: (event) => dispatch(actions.filterAccount(event.target.value)),
	toggleCategory: (event) => dispatch(actions.toggleCategory(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);