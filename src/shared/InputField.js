import styled from 'styled-components';

const InputField = styled.input`
    background-color: #FFF;
	border: 2px solid #CCC;
	font-size: 1.4rem;
	line-height: 2rem;
	&.error {
	    border: 1px solid ${props => props.theme.primaryColor};
	}
`;

export default InputField;