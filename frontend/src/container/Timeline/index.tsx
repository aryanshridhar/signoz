import { StyledDiv } from 'components/Styled';
import { IIntervalUnit, INTERVAL_UNITS } from 'container/TraceDetail/utils';
import useThemeMode from 'hooks/useThemeMode';
import React, { useEffect, useState } from 'react';
import { useMeasure } from 'react-use';

import { styles, Svg, TimelineInterval } from './styles';
import { Interval } from './types';
import { getIntervals, getIntervalSpread } from './utils';

const Timeline_Height = 22;
const Timeline_H_Spacing = 0;

function Timeline({
	traceMetaData,
	globalTraceMetadata,
	setIntervalUnit,
}: TimelineProps): JSX.Element {
	const [ref, { width }] = useMeasure<HTMLDivElement>();
	const { isDarkMode } = useThemeMode();

	const [intervals, setIntervals] = useState<Interval[] | null>(null);

	useEffect(() => {
		const {
			baseInterval,
			baseSpread,
			intervalSpreadNormalized,
		} = getIntervalSpread({
			globalTraceMetadata,
			localTraceMetaData: traceMetaData,
		});

		let intervalUnit = INTERVAL_UNITS[0];
		for (let idx = 0; idx < INTERVAL_UNITS.length; idx++) {
			const standard_interval = INTERVAL_UNITS[idx];
			if (baseSpread * standard_interval.multiplier < 1) {
				const index = parseInt(idx, 10);
				if (index > 1) intervalUnit = INTERVAL_UNITS[index - 1];
				break;
			}
		}

		intervalUnit = intervalUnit || INTERVAL_UNITS[0];
		setIntervals(
			getIntervals({
				baseInterval,
				baseSpread,
				intervalSpreadNormalized,
				intervalUnit,
			}),
		);
		setIntervalUnit(intervalUnit);
	}, [traceMetaData, globalTraceMetadata, setIntervalUnit]);

	return (
		<StyledDiv ref={ref} styledclass={[styles.timelineContainer]}>
			<Svg
				viewBox={`0 0 ${width} ${Timeline_Height}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				<line
					x1={Timeline_H_Spacing}
					y1={Timeline_Height}
					x2={width - Timeline_H_Spacing}
					y2={Timeline_Height}
					stroke={isDarkMode ? 'white' : 'black'}
					strokeWidth="1"
				/>
				{intervals &&
					intervals.map((interval, index) => (
						<TimelineInterval
							transform={`translate(${
								Timeline_H_Spacing +
								(interval.percentage * (width - 2 * Timeline_H_Spacing)) / 100
							},0)`}
							key={`${interval.label + interval.percentage + index}`}
						>
							<text y={13} fill={isDarkMode ? 'white' : 'black'}>
								{interval.label}
							</text>
							<line
								y1={Timeline_Height - 5}
								y2={Timeline_Height + 0.5}
								stroke={isDarkMode ? 'white' : 'black'}
								strokeWidth="1"
							/>
						</TimelineInterval>
					))}
			</Svg>
		</StyledDiv>
	);
}

interface TimelineProps {
	traceMetaData: {
		globalStart: number;
		globalEnd: number;
		spread: number;
		totalSpans: number;
		levels: number;
	};
	globalTraceMetadata: Record<string, number>;
	intervalUnit: IIntervalUnit;
	setIntervalUnit: React.Dispatch<React.SetStateAction<IIntervalUnit>>;
}

export default Timeline;
