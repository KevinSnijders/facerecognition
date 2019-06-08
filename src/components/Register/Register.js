import React from 'react';
import styled, {css} from 'styled-components';

const BorderRadius = css`
	border-radius: .5rem;
`;

const FormElement = css`
	width: 100%;
	font-size: 1.6rem;
	padding: 1.6rem;
	margin-bottom: 1.8rem;
	${BorderRadius}
`;

const Form = styled.div`
	width: 25vw;
	border-color: rgba( 0, 0, 0, .1 );
	box-shadow: 0.4rem 0.4rem 0.8rem 0 rgba( 0, 0, 0, .2 );
	margin: 0 auto;
	${BorderRadius}
`;

const FormBackground = styled.div`
	background-color: ${props => props.primary ? "rgba(238, 238, 238, 0.8)" : "rgba(255, 255, 255, 0.9)"}
`;

const Title = styled.h4`
	color: #333;
	font-size: 1.8rem;
	text-transform: uppercase;
	font-weight: 700;
	text-align: center;
	margin: 2.4rem 0;
`;

const Wrapper = styled.div`
	padding: 1.6rem 2.4rem;
`;


const InputField = styled.input`
	background-color: #FFF;
	border: 2px solid #dadada;
	${FormElement}
`;

const Button = styled.input`
    width: 100%;
    background-color: #ca3435;
    color: #FFF;
    text-transform: uppercase;
    border: 2px solid #ca3435;
    transition: transform .15s ease-out;
    cursor: pointer;
    ${FormElement}
    
    &:active {
        transform: translateY(2px);
    }
`;

const Register = ({onRouteChange}) => {
	return (
		<Form>
			<FormBackground primary>
				<Wrapper top>
					<Title>Register</Title>
					<InputField type="text" name="name" id="name"
					            placeholder="Name">
					</InputField>
					<InputField type="email" name="email-address" id="email-address"
					            placeholder="Email Address">
					</InputField>
					<InputField type="password" name="password" id="password"
					            placeholder="Password">
					</InputField>
					<Button onClick={() => onRouteChange('home')}
					        type="submit" value="Register">
					</Button>
				</Wrapper>
			</FormBackground>
		</Form>
	)
};

export default Register;
