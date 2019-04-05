import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 25px;
`;

export const TransactionSort = (props) => {
	const { options, value, handleChange } = props;
	if (!value) return ('');
	const renderOptions = options ? options.map(a => <MenuItem key={a.key} value={a}>{a.label}</MenuItem>) : [];
	return (
		<Wrapper>
			<FormControl>
				<Select
					value={value}
					onChange={handleChange()}
					name='sort'>
					{renderOptions}
				</Select>
			</FormControl>
		</Wrapper>
	);
}