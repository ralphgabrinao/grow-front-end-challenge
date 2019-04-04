import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 8px 20px;
	overflow: hidden;
	overflow-y: scroll;
`;

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0px;
`;

const Detail = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Label = styled.span`
	font-size: 12px;
	opacity: 0.6;
	letter-spacing: 1px;
`;

const Value = styled.span`
	font-size: 18px;
	opacity: 0.75;
	&.balance {
		font-size: 36px;
	}
`;

export const AccountDetails = (props) => {
	const { account } = props;
	if (!account) return (<Wrapper>Loading account details...</Wrapper>);
	return (
		<Wrapper>
			<Row>
				<Detail>
					<Value className={'balance'}>$ { account.balance }</Value>
					<Label>Balance { account.balanceUpdated ? `as of ${account.balanceUpdated}` : '' }</Label>
				</Detail>
			</Row>
		{
			account.accountId ?
			<Row>
				<Detail>
					<Value>{account.transitNumber}</Value>
					<Label>Transit Number</Label>
				</Detail>
				<Detail>
					<Value>{account.accountNumber}</Value>
					<Label>Account Number</Label>
				</Detail>
			</Row> :
			<div />
		}
		</Wrapper>
	);
}