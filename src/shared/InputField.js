import styled from 'styled-components';

const InputField = styled.input`
  background-color: #FFF;
	border: 1px solid #CCC;
	font-size: 1.4rem;
	line-height: 2rem;
  margin-bottom: ${props => props.theme.gap};
	
	&:focus {
		outline: 1px solid ${props => props.theme.primaryColor}
  }

	&.error {
	    border: 1px solid ${props => props.theme.primaryColor};
  }
`;

export default InputField;