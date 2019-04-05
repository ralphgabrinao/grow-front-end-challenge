import React from 'react';
import styled from 'styled-components';
import { TransactionItem } from './TransactionItem';

const Wrapper = styled.div`
	margin-bottom: 4px;
`;

const Header = styled.div`
	font-weight: 700;
	width: 100%;
	text-align: center;
`;

export const TransactionGroup = ({ group }) => {
	const header = group.date;
	const renderTransactions = group.transactions.map(t => <TransactionItem key={t.transactionId} transaction={t}/>);
	return (
		<Wrapper>
			<Header>{header}</Header>
			{renderTransactions}
		</Wrapper>
	);
}