import styled from 'styled-components';

const Paragraph = styled.p`
	font-size: ${props => props.theme.fontSize};
	cursor: pointer;
	margin: 0;
	color: ${props => props.theme.primaryTextColor}
`;

export default Paragraph;