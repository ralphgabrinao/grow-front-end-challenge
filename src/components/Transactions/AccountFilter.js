import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import { allAccounts } from '../../containers/Transactions/constants';

const Wrapper = styled.div`
	height: 50px;
`;

export const AccountFilter = (props) => {
	const { options, value, handleChange } = props;
	if (!value) return (<div></div>);
	if (options && !options.find(a => a.accountId === '')) options.unshift(allAccounts);
	const renderOptions = options ? options.map(a => <MenuItem key={a.accountId} value={a}>{a.accountName}</MenuItem>) : [];
	return (
		<Wrapper>
			<FormControl>
				<Select
					value={value}
					onChange={handleChange()}
					name='account'>
					{renderOptions}
				</Select>
			</FormControl>
		</Wrapper>
	);
}