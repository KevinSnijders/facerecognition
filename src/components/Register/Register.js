import React from 'react';

import {Form, FormWrapper} from '../../shared/Form';
import InputField from '../../shared/InputField';
import Button from '../../shared/Button';
import Title from '../../shared/Title';
import styled from 'styled-components';

const RegisterForm = styled(Form)`
	margin-top: 10rem;
`;

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
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
		});
	};

	onPasswordChange = (event) => {
		this.setState({
			password: event.target.value
		});
	};

	onSubmitSignIn = () => {
		fetch(`${this.props.baseApi}/register`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		}).then(response => response.json())
			.then(user => {
				if (user) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			});
	};

	render() {
		return (
			<RegisterForm>
				<FormWrapper top>
					<Title>Register</Title>
					<InputField className="mb2" onChange={this.onNameChange} type="text" name="name" id="name"
					            placeholder="Name">
					</InputField>
					<InputField className="mb2" onChange={this.onEmailChange} type="email" name="email-address" id="email-address"
					            placeholder="Email Address">
					</InputField>
					<InputField className="mb3" onChange={this.onPasswordChange} type="password" name="password" id="password"
					            placeholder="Password">
					</InputField>
					<Button className="mb3" onClick={this.onSubmitSignIn}
					        type="submit" value="Register">
							Register
					</Button>
				</FormWrapper>
			</RegisterForm>
		)
	}
}

export default Register;
