import React from 'react';
import styled from 'styled-components';

import {Form, FormWrapper} from '../../shared/Form';
import InputField from '../../shared/InputField';
import Button from '../../shared/Button';
import Paragraph from '../../shared/Paragraph';
import Title from '../../shared/Title';

const SignUpForm = styled(Form)`
	margin-top: 10rem;
`;

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

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({
			signInEmail: event.target.value
		})
	};

	onPasswordChange = (event) => {
		this.setState({
			signInPassword: event.target.value
		})
	};

	
	onSubmitSignIn = () => {
		fetch(`${this.props.baseApi}/signin`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		}).then(response => response.json())
			.then(data => {
				if (data.userId && data.success === 'true') {
					this.saveAuthTokenInSession(data.token);
					fetch(`${this.props.baseApi}/profile/${data.userId}`, {
						method: 'get',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': data.token
						}
					})
						.then(response => response.json())
						.then(user => {
							if (user && user.email) {
								this.props.loadUser(user);
								this.props.onRouteChange('home');
							}
						})
				}
			});

	};

	render() {
		const {onRouteChange} = this.props;
		return (
			<SignUpForm>
				<FormWrapper>
					<Title>Sign In</Title>
					<InputField className="mb2" onChange={this.onEmailChange} type="email" name="email-address"
					            id="email-address"
					            placeholder="Email Address">
					</InputField>
					<InputField className="mb3" onChange={this.onPasswordChange} type="password" name="password"
					            id="password"
					            placeholder="Password">
					</InputField>
					<Button className="mb3" onClick={this.onSubmitSignIn} type="submit" value="signin">Sign in</Button>
				</FormWrapper>
				<SignUpBackground>
					<FormWrapper bottom>
						<AnimatedParagraph onClick={() => onRouteChange('register')}>New here? <Span>Sign
							Up</Span></AnimatedParagraph>
					</FormWrapper>
				</SignUpBackground>
			</SignUpForm>
		)
	}
}

export default Signin;