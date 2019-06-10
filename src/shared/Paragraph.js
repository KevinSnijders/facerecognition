import styled from 'styled-components';

const Paragraph = styled.p`
	font-size: 1.4rem;
	cursor: pointer;
	margin: 0.8rem 0;
	color: ${props => props.theme.primaryTextColor}
`;

export default Paragraph;