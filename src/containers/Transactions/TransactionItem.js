import React from 'react';
import styled from 'styled-components';

const cardHeight = '88px';

const Wrapper = styled.div`
	height: ${cardHeight};
	display: flex;
	justify-content: space-between;
	margin-top: 4px;
	margin-bottom: 4px;
`;

const Text = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	white-space: nowrap; 
	text-overflow: ellipsis;
	overflow: hidden;
`;

const OverlineText = styled.span`
	font-size: 12px;
	font-weight: 600;
	opacity: 0.6;
	letter-spacing: 2px;
`;

const PrimaryText = styled.div`
	font-size: 16px;
	margin-top: 2px;
	margin-bottom: 2px;
`;

const SecondaryText = styled.span`
	font-size: 12px;
	opacity: 0.7;
`;

const Amount = styled.div`
	width: 150px;
	height: ${cardHeight};
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 20px;
	font-weight: 400;
`;

const Deposit = styled.span`
	color: #28A566;
`;

export const TransactionItem = ({ transaction }) => {
	return (
		<Wrapper>
			<Text>
				<OverlineText>{transaction.category}</OverlineText>
				<PrimaryText>{transaction.description}</PrimaryText>
				<SecondaryText>{transaction.account ? transaction.account.accountName : ''}</SecondaryText>
			</Text>
			<Amount> 
			{
				transaction.amount < 0 ? 
				<span>{transaction.amount}</span> :
				<Deposit>{transaction.amount}</Deposit>
			}
			</Amount>
		</Wrapper>
	);
}