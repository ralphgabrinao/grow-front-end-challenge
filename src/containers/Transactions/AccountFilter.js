import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { allAccounts } from './constants';

const Wrapper = styled.div`
	height: 50px;
`;

export const AccountFilter = (props) => {
	const { accounts, selected, handleChange } = props;
	if (!selected) return (<div></div>);
	if (accounts && !accounts.find(a => a.accountId === '')) accounts.unshift(allAccounts);
	const renderOptions = accounts ? accounts.map(a => <MenuItem key={a.accountId} value={a}>{a.accountName}</MenuItem>) : [];
	return (
		<Wrapper>
			<FormControl>
				<Select
					value={selected}
					onChange={handleChange()}
					name='account'>
					{renderOptions}
				</Select>
			</FormControl>
		</Wrapper>
	);
}