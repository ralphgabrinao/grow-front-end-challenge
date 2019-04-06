import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 20px;
	max-height: 150px;
	display: flex;
`;

const PieChart = props => {
	const { data } = props;
	const chartStyle = { height: '140px' };
	const labelStyle = { fontSize: '8px' };
	const lineWidth = 15;
	return (
		<ReactMinimalPieChart
			data={data}
			label={({ data, dataIndex }) =>
				Math.round(data[dataIndex].percentage) + '%'
			}
			labelStyle={labelStyle}
			lineWidth={lineWidth}
			style={chartStyle}
			radius={42}
  			labelPosition={112}
			rounded />
	);
};

const Labels = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Color = styled.div`
	height: 10px;
	width: 10px;
	margin-right: 8px;
	margin-bottom: 4px;
`;

const Title = styled.span`
	font-size: 12px;
	opacity: 0.7;
`;

const LabelItem = props => {
	const { title, color } = props;
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<Color style={{ backgroundColor: color }}/>
			<Title>{title}</Title>
		</div>
	);
}

const ChartLabel = props => {
	const { data } = props;
	const labelItems = data.map(d => <LabelItem key={d.color} title={d.title} color={d.color} />)
	return (
		<Labels>
			{labelItems}
		</Labels>
	);
}

const randomColor = () => {
	// https://stackoverflow.com/questions/47616381/how-to-exclude-all-shades-of-gray-while-generating-random-hex-color-code
	const rangeSize = 175; // adapt as needed
	const parts = [
		Math.floor(Math.random()*256),
		Math.floor(Math.random()*rangeSize),
		Math.floor(Math.random()*rangeSize) + 256-rangeSize 
	].sort( (a, b) => Math.random() < 0.5 );

	return `#${parts.map( p => ('0' + p.toString(16)).substr(-2) ).join('')}`;
};

export const TransactionSummary = (props) => {
	const { data } = props;
	if (!data || !data.categories) return '';
	const categories = data.categories.map(c => { return {...c, color: randomColor() }});
	return (
		<Wrapper>
			<PieChart data={categories} />
			<ChartLabel data={categories} />
		</Wrapper>
	);
}