import { Typography } from 'antd';
import Graph from 'components/Graph';
import Spinner from 'components/Spinner';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useMeasure } from 'react-use';
import { AppState } from 'store/reducers';
import { TraceReducer } from 'types/reducer/trace';

import { getChartData, getChartDataforGroupBy } from './config';
import { Container } from './styles';

function TraceGraph(): JSX.Element {
	const [ref, { width }] = useMeasure();

	const { spansGraph, selectedGroupBy, yAxisUnit } = useSelector<
		AppState,
		TraceReducer
	>((state) => state.traces);

	const { loading, error, errorMessage, payload } = spansGraph;

	const ChartData = useMemo(() => {
		return selectedGroupBy.length === 0
			? getChartData(payload)
			: getChartDataforGroupBy(payload);
	}, [payload, selectedGroupBy]);

	if (error) {
		return (
			<Container center>
				<Typography>{errorMessage || 'Something went wrong'}</Typography>
			</Container>
		);
	}

	if (loading || payload === undefined) {
		return (
			<Container>
				<Spinner height="20vh" size="small" tip="Loading..." />
			</Container>
		);
	}

	return (
		<Container ref={ref}>
			<Graph
				animate={false}
				data={ChartData}
				name="traceGraph"
				type="line"
				yAxisUnit={yAxisUnit}
				forceReRender={width}
			/>
		</Container>
	);
}

export default TraceGraph;
