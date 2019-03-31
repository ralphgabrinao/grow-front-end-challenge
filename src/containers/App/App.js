import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeSelectApp } from './selectors';
import Routes from './Routes';
import styled from 'styled-components';

const Wrapper = styled.div`
	overflow-y: scroll;
	height: 100vh;
	font-family: "proxima-nova", "Helvetica Neue", Helvetica, Arial, sans-serif;
	background-color: #ECECEC;
	color: #333333;
	line-height: 1.42857143;
	font-size: 12px;
`;

export class App extends React.Component {
	render() {
		const globalProps = {};
		return (
			<Wrapper>
				<Routes globalProps={globalProps}/>
			</Wrapper>
		);
	}
}

App.propTypes = {
	App: PropTypes.any
};

/* istanbul ignore next */
const mapStateToProps = state => {
	return {
		App: makeSelectApp(state)
	};
};


/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
	dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);