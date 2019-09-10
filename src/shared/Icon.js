import styled from 'styled-components';
import InputField from './InputField';

const IconInputField = styled(InputField)`
		padding-left: 4.6rem;
	    background: #fff url(${props => props.src}) 1.2rem center no-repeat;
	    background-size: auto
`;

export default IconInputField;