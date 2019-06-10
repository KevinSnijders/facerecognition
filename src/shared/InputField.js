import styled from 'styled-components';

const InputField = styled.input`
    background-color: #FFF;
	border: 2px solid #CCC;
	font-size: ${props => props.theme.fontSize};
	line-height: 2rem;
`;

export default InputField;