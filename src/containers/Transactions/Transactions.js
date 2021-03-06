import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from './actions';
import { AccountDetails } from '../../components/Transactions/AccountDetails';
import { AccountFilter } from '../../components/Transactions/AccountFilter';
import { DateFilter } from './DateFilter';
import { CategoriesFilter } from '../../components/Transactions/CategoriesFilter';
import { TransactionsList } from '../../components/Transactions/TransactionsList';
import { TransactionSort } from '../../components/Transactions/TransactionSort';
import { TransactionSummary } from '../../components/Transactions/TransactionSummary';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { 
	getGroupedTransactions,
	makeSelectTransactionsData,
	getAccountsData,
	getCategories,
	getTransactionSummary,
	makeSelectFilters,
	makeSelectSort
} from './selectors';

const Wrapper = styled.div`
	height: 100%;
	max-width: 1800px;
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

const Link = styled.button`
	font-size: 12px;
	opacity: 0.7;
	&:hover { cursor: pointer; text-decoration: underline; }
	&:focus { outline: 0; }
	background: none;
	border: none;
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
	}

	render() {
		const state = this.props.Transactions;
		const transactions = state.filteredTransactions;
		const accounts = state.accountsData ? state.accountsData.accounts : [];
		const accountFilter = state.filters ? state.filters.account : null;
		const accountDetails = { renderComponent: () => <AccountDetails account={accountFilter}></AccountDetails> }
		const fromValue = state.filters.date ? state.filters.date.from : '';
		const toValue = state.filters.date ? state.filters.date.to : '';
		const dateFilter = {
			header: () => <HeaderRow><Header>Date Range</Header></HeaderRow>,
			renderComponent: () =>
				<DateFilter
					fromValue={fromValue}
					toValue={toValue}
					onChangeFrom={() => this.props.filterByDateFrom}
					onChangeTo={() => this.props.filterByDateTo}
				/>
		};
		const categoriesFilter = {
			header: () => <HeaderRow><Header>Categories</Header></HeaderRow>,
			renderComponent: () => 
				<CategoriesFilter
					options={state.filters.category}
					handleChange={() => this.props.toggleCategory} /> 
		};

		const sortOptions = state.sort.options;
		const sortValue = state.sort.value;
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
		const resetLink = () => {
			return (
				<Grid item sm={12}>
					<Link onClick={() => this.props.resetAllFilters()}>Reset all filters</Link>
				</Grid>
			);
		};
		const summary = {
			header: () => <HeaderRow><Header>Summary</Header></HeaderRow>,
			renderComponent: () => <TransactionSummary data={state.summary}/>
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
						{renderGridItem(dateFilter)}
						{renderGridItem(categoriesFilter)}
						{resetLink()}
					</Grid>
					<Grid item sm={8}>
						{transactions.length > 0 ? renderGridItem(summary) : ''}
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
		sort: PropTypes.shape({
			options: PropTypes.array,
			value: PropTypes.object
		}),
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
			summary: getTransactionSummary(state),
			transactionsData: makeSelectTransactionsData(state),
			filteredTransactions: getGroupedTransactions(state),
			filters: makeSelectFilters(state),
			sort: makeSelectSort(state)
		}
	};
};


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
	fetchAccounts: () => dispatch(actions.fetchAccounts()),
	fetchCategories: () => dispatch(actions.fetchCategories()),
	fetchTransactions: () => dispatch(actions.fetchTransactions()),
	filterAccount: (event) => dispatch(actions.filterAccount(event.target.value)),
	filterByDateFrom: (event) => dispatch(actions.filterByDateFrom(event.target.value)),
	filterByDateTo: (event) => dispatch(actions.filterByDateTo(event.target.value)),
	resetAllFilters: () => dispatch(actions.resetAllFilters()),
	sortTransactions: (event) => dispatch(actions.sortTransactions(event.target.value)),
	toggleCategory: (event) => dispatch(actions.toggleCategory(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);