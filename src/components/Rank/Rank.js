import React from 'react';
import styled from 'styled-components';

const RankTitle = styled.h1`
	font-size: 3rem;
	color: ${props => props.theme.lightTextColor}
	margin: 3rem 0 0;
`;

const RankEntries = styled.p`
	font-size: 3.2rem;
	color: ${props => props.theme.lightTextColor}
    font-weight: 700;
    padding: 1.2rem 0;
`;

const Rank = ({name, entries}) => {
	return (
		<div>
			<RankTitle>{`${name}, your current rank is`}</RankTitle>
			<RankEntries>
				{entries}
			</RankEntries>
		</div>
	)
};

export default Rank;