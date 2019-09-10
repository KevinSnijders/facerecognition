import React from 'react';
import styled from 'styled-components';

import {Form, FormWrapper} from '../../shared/Form';
import InputField from '../../shared/InputField';
import Button from '../../shared/Button';
import Paragraph from '../../shared/Paragraph';
import Title from '../../shared/Title';

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

function validate(route, name, email, password) {
    // true means invalid, so our conditions got reversed
    let fields = {
        email: email.length === 0,
        password: password.length === 0
    };

    if (route === 'signin') {
        return fields
    } else {
        return {...fields, name: name.length === 0,}
    }
}

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            touched: {
                name: false,
                email: false,
                password: false
            },
            response: {
                initialResponse
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

    handleBlur = (field) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
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

    canBeSubmitted(route) {
        const errors = validate(route, this.state.name, this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    onSubmitForm(e) {
        let route = this.getUserRoute();
        let body = this.createBody();

        if (!this.canBeSubmitted(route)) {
            e.preventDefault();
            return;
        }

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
                    <strong>Error:</strong> {this.state.response.message}
                </UserFormError>
            )
        } else {
            return null
        }
    }

    createFormMarkup() {
        const {route, onRouteChange} = this.props;
        const errors = validate(route, this.state.name, this.state.email, this.state.password);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        let sharedInputMarkup = (
            <div>
                <InputField
                    id="email-address"
                    className={shouldMarkError("email") ? "mb2 error" : "mb2"}
                    label="Email address"
                    placeholder="Email address"
                    onChange={this.onEmailChange}
                    onBlur={() => this.handleBlur("email")}
                    name="email-address"
                    type="email"
                    value={this.state.email}
                    required
                />


                <InputField
                    id="password"
                    className={`mb4 ${shouldMarkError("password") ? "error" : ""}`}
                    label="password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                    onBlur={() => this.handleBlur("password")}
                    name="password"
                    type="password"
                    required
                />
            </div>
        );
        if (route === 'signin' || route === 'signout') {
            return (
                <UserFormContainer>
                    <FormWrapper>
                        <Title>Sign In</Title>
                        {this.displayError()}
                        {sharedInputMarkup}
                        <Button className="mb3" disabled={isDisabled} onClick={() => this.onSubmitForm(route)}
                                type="button" value="signin">Sign
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
                        <InputField
                            id="name"
                            className={shouldMarkError("name") ? "mb2 error" : "mb2"}
                            label="Name"
                            placeholder="Name"
                            onChange={this.onNameChange}
                            onBlur={() => this.handleBlur("name")}
                            name="name"
                            type="text"
                            value={this.state.name}
                            required
                        >
                        </InputField>
                        {sharedInputMarkup}
                        <Button className="mb3" disabled={isDisabled} onClick={() => this.onSubmitForm(route)}
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