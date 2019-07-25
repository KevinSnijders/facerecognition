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

const RegisterForm = styled(Form)`
	margin-top: 10rem;
`;

class UserForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			error: false,
			message: {
				error: "",
				success: ""
			}
		}
	}

	onNameChange = (event) => {
		this.setState({
			name: event.target.value
		});
	};

	onEmailChange = (event) => {
		this.setState({
			email: event.target.value
		})
	};

	onPasswordChange = (event) => {
		this.setState({
			password: event.target.value
		})
	};

	getFetchBody = (type) => {
		let body = {
			email: this.state.email,
			password: this.state.password
		};
		let registerBody, signInBody;
		switch (type) {
			case 'register' :
				registerBody = {name: this.state.name,...body};
				return registerBody;
			case 'signin' :
				signInBody = {...body};
				return signInBody;
			default:
				return body;
		}
	};

	onSubmitForm = (type) => {
		let body = this.getFetchBody(type);

		fetch(`${this.props.baseApi}/${type}`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)

		}).then(response => {
			if (response.status === 200) {
				this.setState({
					error: false,
				});
			} else {
				this.setState({
					error: true,
				});
			}
			return response.json()
		})
			.then(data => {
				if (this.state.error) {
					this.setState({
						message: {
							error: data
						}
					})
				} else if (data) {
					this.setState({
						message: {
							error: ''
						}

					});
					this.props.loadUser(data);
					this.props.onRouteChange('home');
				}
			})
			.catch(err => console.log(err));
	};

	createFormMarkup() {
		const {route, onRouteChange} = this.props;
		let sharedInputMarkup = (
			<div>
				<InputField className="mb2" onChange={this.onEmailChange} type="email" name="email-address"
				            id="email-address"
				            placeholder="Email Address">
				</InputField>
				<InputField className="mb3" onChange={this.onPasswordChange} type="password" name="password"
				            id="password"
				            placeholder="Password">
				</InputField>
			</div>
		);

		if (route === 'signin' || route === 'signout') {
			return (
				<SignUpForm>
					<FormWrapper>
						<Title>Sign In</Title>
						{this.state.message.error}
						{sharedInputMarkup}
						<Button className="mb3" onClick={() => this.onSubmitForm(route)} type="submit" value="signin">Sign
							in</Button>
					</FormWrapper>
					<SignUpBackground>
						<FormWrapper bottom>
							<AnimatedParagraph onClick={() => onRouteChange('register')}>New here? <Span>Sign
								Up</Span></AnimatedParagraph>
						</FormWrapper>
					</SignUpBackground>
				</SignUpForm>
			);
		} else if (route === 'register') {
			return (
				<RegisterForm>
					<FormWrapper top>
						<Title>Register</Title>
						{this.state.message.error}
						<InputField className="mb2" onChange={this.onNameChange} type="text" name="name" id="name"
						            placeholder="Name">
						</InputField>
						{sharedInputMarkup}
						<Button className="mb3" onClick={() => this.onSubmitForm(route)}
						        type="submit" value="Register">
							Register
						</Button>
					</FormWrapper>
				</RegisterForm>
			)
		}
	};

	render() {
		return this.createFormMarkup()
	}
}

export default UserForm;