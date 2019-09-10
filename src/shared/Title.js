import styled from 'styled-components';

const Title = styled.h4`
	color: ${props => props.theme.primaryColor};
	font-size: 2.4rem;
	text-align: center;
	margin-bottom: ${props => props.theme.gap};
`;

export default Title;