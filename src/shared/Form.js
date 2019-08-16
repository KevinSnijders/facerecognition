import styled from 'styled-components';

const Form = styled.div`
	width: 300px;
	max-width: 100%;
	border-color: rgba( 0, 0, 0, .1 );
	box-shadow: 0.4rem 0.4rem 0.8rem 0 rgba( 0, 0, 0, .2 );
	margin: 0 auto;
	background-color: ${props => props.theme.primaryFormBg};
	border-radius: ${props => props.theme.borderRadius};
	border-top: 5px solid ${props => props.theme.primaryColor};
	overflow: hidden;
	position: relative;
`;

const FormWrapper = styled.div`
	padding: ${props => props.theme.gap};
`;

export {Form, FormWrapper};