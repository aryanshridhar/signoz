import React from 'react';

import {
	Container,
	Service,
	Span,
	SpanConnector,
	SpanName,
	SpanWrapper,
} from './styles';

function SpanNameComponent({
	name,
	serviceName,
}: SpanNameComponent): JSX.Element {
	return (
		<Container title={`${name} ${serviceName}`}>
			<SpanWrapper>
				<Span ellipsis>{name}</Span>
				<Service>{serviceName}</Service>
			</SpanWrapper>
		</Container>
	);
}

interface SpanNameComponent {
	name: string;
	serviceName: string;
}

export default SpanNameComponent;
