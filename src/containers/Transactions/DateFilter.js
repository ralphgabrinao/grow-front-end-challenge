import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Wrapper = styled.div`
	padding: 20px;
	height: 130px;
	overflow: hidden;
	overflow-y: scroll;
`;

const Divider = styled.div`
	height: 20px;
`;

export const DateFilter = (props) => {
	const { fromValue, toValue, onChangeFrom, onChangeTo } = props;
	return (
		<Wrapper>
			<TextField
				id='date-from'
				label='From'
				type='date'
				value={fromValue}
				onChange={onChangeFrom()}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Divider />
			<TextField
				id='date-to'
				label='To'
				type='date'
				value={toValue}
				onChange={onChangeTo()}
				InputLabelProps={{
					shrink: true,
				}}
			/>
		</Wrapper>
	);
}