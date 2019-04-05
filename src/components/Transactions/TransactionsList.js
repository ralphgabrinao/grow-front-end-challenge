import React from 'react';
import { TransactionGroup } from './TransactionGroup';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 24px;
`;

export const TransactionsList = (props) => {
	const { transactions } = props;
	const renderTransactions = transactions.map(t => <TransactionGroup key={t.date} group={t}/>);
	return (
		<Wrapper>
		{
			transactions.length > 0 ?
			renderTransactions :
			'No transactions to show'
		}
		</Wrapper>
	);
}