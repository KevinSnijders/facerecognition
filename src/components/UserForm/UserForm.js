import React from 'react';
import styled from 'styled-components';

import {Form, FormWrapper} from '../../shared/Form';
import IconInputField from '../../shared/Icon';
import Button from '../../shared/Button';
import Paragraph from '../../shared/Paragraph';
import Title from '../../shared/Title';
import UserIcon from '../../assets/svg/icons/user.svg'
import PasswordIcon from '../../assets/svg/icons/password.svg'
import EmailIcon from '../../assets/svg/icons/email.svg'

const UserFormContainer = styled(Form).attrs({
	as: "form"
})`
	margin-top: 10rem;
`;

const UserFormAnchor = styled.div`
	background-color: ${props => props.theme.secondaryFormBg}
`;

const UserFormError = styled.div`
	font-size: 1.4rem;
    background-color: #fae5e5;
    border: 1px solid #ED4747;
    padding: .8rem;
    font-style: italic;
    margin-bottom: 1.6rem;
    border-radius: ${props => props.theme.borderRadius};
`;

const Span = styled.span`
	color: ${props => props.theme.primaryColor};
	text-decoration: underline;
	    
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

const initialResponse = {
	success: false,
	message: ''
};

class UserForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			response: {
				...initialResponse
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

	getUserRoute() {
		let {route} = this.props;
		return route
	}

	setResponseMessage(response) {
		let {success, message} = response;
		this.setState({
			response: {
				success,
				message
			}
		})
	}

	createBody() {
		let registerBody, signInBody;
		let body = {
			email: this.state.email,
			password: this.state.password
		};
		let route = this.getUserRoute();

		switch (route) {
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

	getProfileData = (data) => {
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
	};

	loadUserRoute(route, data) {
		let {user} = data;
		switch (route) {
			case 'signin':
				if (data.userId) {
					this.saveAuthTokenInSession(data.token);
					this.getProfileData(data);
				}
				break;
			case 'register':
				this.props.loadUser(user);
				this.props.onRouteChange('home');
				break;
			default:
				return null
		}
	}

	onSubmitForm() {
		let body = this.createBody();
		let route = this.getUserRoute();
		fetch(`${this.props.baseApi}/${route}`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(body)
		}).then(response => {
			return response.json()
		})
			.then(data => {
				if (data.success === true) {
					this.setResponseMessage(data);
					this.loadUserRoute(route, data);
				} else {
					this.setResponseMessage(data)
				}
			})
			.catch(err => console.log(err));
	};

	displayError() {
		let {message} = this.state.response;
		if (message !== '' && message !== undefined) {
			return (
				<UserFormError>
					{this.state.response.message}
				</UserFormError>
			)
		} else {
			return null
		}
	}

	createFormMarkup() {
		const {route, onRouteChange} = this.props;
		let sharedInputMarkup = (
			<>
				<IconInputField src={EmailIcon} onChange={this.onEmailChange} type="email" name="email-address"
				           id="email-address" placeholder="Email address" label="Email address"
				           required/>


				<IconInputField src={PasswordIcon} onChange={this.onPasswordChange} type="password" name="password"
				           id="password" placeholder="Password" label="password" required/>
			</>
		);
		if (route === 'signin' || route === 'signout') {
			return (
				<UserFormContainer>
					<FormWrapper>
						<Title>Sign In</Title>
						{this.displayError()}
						{sharedInputMarkup}
						<Button onClick={() => this.onSubmitForm(route)} type="button" value="signin">Sign
							in</Button>
					</FormWrapper>
					<UserFormAnchor>
						<FormWrapper bottom>
							<AnimatedParagraph onClick={() => {
								onRouteChange('register');
								this.setResponseMessage(initialResponse);
							}}>New here? <Span>Sign
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
						{this.displayError()}
						<IconInputField src={UserIcon} onChange={this.onNameChange} type="text" name="name" id="name"
						           placeholder="Name" label="Name" required/>
						{sharedInputMarkup}
						<Button onClick={() => this.onSubmitForm(route)}
						        type="button" value="Register">
							Register
						</Button>
					</FormWrapper>
					<UserFormAnchor>
						<FormWrapper bottom>
							<AnimatedParagraph onClick={() => {
								onRouteChange('signin');
								this.setResponseMessage(initialResponse);
							}}>Already have an account? <Span>Sign
								in</Span></AnimatedParagraph>
						</FormWrapper>
					</UserFormAnchor>
				</UserFormContainer>
			)
		} else
			return null
	};

	render() {
		return this.createFormMarkup()
	}
}

export default UserForm;