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

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Header = styled.span`
	font-size: 14px;
	font-weight: 600;
	letter-spacing: 2px;
	opacity: 0.7;
`;

// const Link = styled.button`
// 	font-size: 12px;
// 	cursor: pointer;
// 	border: none;

// 	&:focus { outline: 0; }
// 	&:hover { text-decoration: underline; }
// `;

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
				<HeaderWrapper>
					<Header>Categories</Header>
					{/* <Link onClick={toggleAll}>Toggle All</Link> */}
				</HeaderWrapper>
				<FormGroup>
					{renderOptions}
				</FormGroup>
			</FormControl>
		</Wrapper>
	);
}