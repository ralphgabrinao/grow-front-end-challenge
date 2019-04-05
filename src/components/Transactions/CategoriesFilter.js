import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Wrapper = styled.div`
	padding: 20px;
	height: 300px;
	overflow: hidden;
	overflow-y: scroll;
`;

const renderOption = (o, handleChange) => {
	const checkbox = () => 
		<Checkbox
			color='default'
			checked={o[1]}
			onChange={handleChange()}
			value={o[0]} />;
	const formatLabel = str => (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).replace(/[_]/g, ' ');
	return (
		<FormControlLabel key={o[0]} control={checkbox()} label={formatLabel(o[0])} />
	);
};

export const CategoriesFilter = (props) => {
	const { options, handleChange } = props;
	const entries = options ? Object.entries(options) : [];
	const renderOptions = entries.map(e => renderOption(e, handleChange));
	return (
		<Wrapper>
			<FormControl component='fieldset'>
				<FormGroup>
					{renderOptions}
				</FormGroup>
			</FormControl>
		</Wrapper>
	);
}