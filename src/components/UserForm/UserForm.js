import React from 'react';
import styled from 'styled-components';

import {Form, FormWrapper} from '../../shared/Form';
import InputField from '../../shared/InputField';
import Button from '../../shared/Button';
import Paragraph from '../../shared/Paragraph';
import Title from '../../shared/Title';

const UserFormContainer = styled(Form)`
	margin-top: 10rem;
`;

const UserFormAnchor = styled.div`
	background-color: ${props => props.theme.secondaryFormBg}
`;

const UserFormError = styled.div`
	font-size: 1.4rem;
	color: ${props => props.theme.primaryColor}
	margin-bottom: 2rem;
	transition: 
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

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};


	getFetchBody = (type) => {
		let body = {
			email: this.state.email,
			password: this.state.password
		};
		let registerBody, signInBody;
		switch (type) {
			case 'register' :
				registerBody = {name: this.state.name, ...body};
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
				}
				if (data.userId && data.success) {
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
				} else {
					console.log("error")
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
				<InputField className="mb4" onChange={this.onPasswordChange} type="password" name="password"
				            id="password"
				            placeholder="Password">
				</InputField>
			</div>
		);

		if (route === 'signin' || route === 'signout') {
			return (
				<UserFormContainer>
					<FormWrapper>
						<Title>Sign In</Title>
						<UserFormError>
							{this.state.message.error}
						</UserFormError>
						{sharedInputMarkup}
						<Button className="mb3" onClick={() => this.onSubmitForm(route)} type="submit" value="signin">Sign
							in</Button>
					</FormWrapper>
					<UserFormAnchor>
						<FormWrapper bottom>
							<AnimatedParagraph onClick={() => onRouteChange('register')}>New here? <Span>Sign
								Up</Span></AnimatedParagraph>
						</FormWrapper>
					</UserFormAnchor>
				</UserFormContainer>
			);
		} else if (route === 'register') {
			return (
				<UserFormContainer>
					<FormWrapper top>
						<Title>Register</Title>
						<UserFormError>
							{this.state.message.error}
						</UserFormError>
						<InputField className="mb2" onChange={this.onNameChange} type="text" name="name" id="name"
						            placeholder="Name">
						</InputField>
						{sharedInputMarkup}
						<Button className="mb3" onClick={() => this.onSubmitForm(route)}
						        type="submit" value="Register">
							Register
						</Button>
					</FormWrapper>
					<UserFormAnchor>
						<FormWrapper bottom>
							<AnimatedParagraph onClick={() => onRouteChange('signin')}>Already have an account? <Span>Sign
								in</Span></AnimatedParagraph>
						</FormWrapper>
					</UserFormAnchor>
				</UserFormContainer>
			)
		}
	};

	render() {
		return this.createFormMarkup()
	}
}

export default UserForm;