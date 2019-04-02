import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';
import { AccountDetails } from './AccountDetails';
import { AccountFilter } from './AccountFilter';
import { CategoriesFilter } from './CategoriesFilter';
import { TransactionsList } from './TransactionsList';
import { TransactionSort } from './TransactionSort';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { 
	getGroupedTransactions,
	makeSelectTransactionsData,
	getAccountsData,
	getCategories,
	getFilters,
	getSortOptions,
	getSortValue
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
`;

const HeaderRow = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 24px 24px 0px 24px;
`;

const Divider = styled.div`
	height: 20px;
`;

const renderGridItem = ({ header, renderComponent }) => {
	return (
		<Grid item sm={12}>
			<Paper square={false} elevation={1}>
				{header ? header() : ''}
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
		this.props.fetchSortOptions();
	}

	render() {
		const state = this.props.Transactions;
		const transactions = state.filteredTransactions;
		const accounts = state.accountsData ? state.accountsData.accounts : [];
		const accountFilter = state.filters ? state.filters.account : null;
		const accountDetails = { renderComponent: () => <AccountDetails account={accountFilter}></AccountDetails> }
		const categoriesFilter = {
			header: () => 
				<HeaderRow>
					<Header>Categories</Header>
				</HeaderRow>,
			renderComponent: () => 
				<CategoriesFilter
					options={state.filters.category}
					handleChange={() => this.props.toggleCategory} /> 
		};

		const sortOptions = state.sortOptions;
		const sortValue = state.sortValue;
		const transactionsList = {
			header: () => 
				<HeaderRow>
					<Header>Activity</Header>
					<TransactionSort
						options={sortOptions}
						value={sortValue}
						handleChange={() => this.props.sortTransactions} />
				</HeaderRow>,
			renderComponent: () => <TransactionsList transactions={transactions} />
		};
		return (
			<Wrapper>
				<Grid container spacing={24} justify='center'>
					<Grid item sm={12}>
						<AccountFilter
							options={accounts}
							value={accountFilter}
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
		categories: PropTypes.array,
		transactionsData: PropTypes.object,
		filteredTransactions: PropTypes.array,
		filters: PropTypes.object,
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
			filters: getFilters(state),
			sortOptions: getSortOptions(state),
			sortValue: getSortValue(state)
		}
	};
};


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
	fetchAccounts: () => dispatch(actions.fetchAccounts()),
	fetchCategories: () => dispatch(actions.fetchCategories()),
	fetchSortOptions: () => dispatch(actions.fetchSortOptions()),
	fetchTransactions: () => dispatch(actions.fetchTransactions()),
	filterAccount: (event) => dispatch(actions.filterAccount(event.target.value)),
	sortTransactions: (event) => dispatch(actions.sortTransactions(event.target.value)),
	toggleCategory: (event) => dispatch(actions.toggleCategory(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);