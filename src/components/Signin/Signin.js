import React from 'react';
import styled from 'styled-components';

import {Form, FormWrapper} from '../../shared/Form';
import InputField from '../../shared/InputField';
import Button from '../../shared/Button';
import Paragraph from '../../shared/Paragraph';
import Title from '../../shared/Title';


const SignUpBackground = styled.div`
	background-color: ${props => props.theme.secondaryFormBg}
`;

const Span = styled.span`
	color: ${props => props.theme.primaryColor};
	
	&:hover {
		color: ${props => props.theme.primaryColorDrk};
	}
`;

const AnimatedParagraph = styled(Paragraph)`
	transition: scale, transform .15s ease-out;
	
	&:hover {
		transform: scale(1.05) translateY(2px);
	}
`;


const Signin = ({onRouteChange}) => {
	return (
		<Form>
			<FormWrapper>
				<Title>Sign In</Title>
				<InputField type="email" name="email-address" id="email-address"
				            placeholder="Email Address">
				</InputField>
				<InputField type="password" name="password" id="password"
				            placeholder="Password">
				</InputField>
				<Button onClick={() => onRouteChange('home')}>Sign in</Button>
			</FormWrapper>
			<SignUpBackground>
				<FormWrapper bottom>
					<AnimatedParagraph onClick={() => onRouteChange('register')}>New here? <Span>Sign Up</Span></AnimatedParagraph>
				</FormWrapper>
			</SignUpBackground>
		</Form>
	)
};

export default Signin;