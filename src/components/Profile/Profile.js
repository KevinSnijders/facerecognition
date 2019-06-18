import React from 'react';
import './Profile.css';

import {Form, FormWrapper} from '../../shared/Form';
import InputField from '../../shared/InputField';
import styled from 'styled-components';

const RegisterForm = styled(Form)`
	margin-top: 10rem;
`;

class Profile extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.name,
			age: this.props.user.age
		}
	}

	onFormChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		switch(name) {
			case 'user--name':
				this.setState({name: value});
				break;
			case 'user--age':
				this.setState({age: value});
				break;
			default:
				return;
		}

	};

	onProfileUpdate = (data) => {
		const {baseApi} = this.props;
		fetch(`${baseApi}/profile/${this.props.user.id}`, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({formInput: data})
		})
			.then(response => {
				this.props.toggleModal();
				this.props.loadUser({...this.props.user, ...data});
			})
			.catch(console.log)
	};
	render() {
		const {user} = this.props;
		const {name, age} = this.state;
		return (
			<div className="profile-modal">
				<RegisterForm>
					<img src="http://tachyons.io/img/logo.jpg" className="br-100 h3 w3 dib" alt="avatar"/>
					<h1>{this.state.name}</h1>
					<h4>{`Images submitted: ${user.entries}`}</h4>
					<p>{`member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
					<FormWrapper top>
						<label htmlFor="user--name">Name:</label>
						<InputField onChange={this.onFormChange} className="mb2" type="text" name="user--name" id="user--name"
						            placeholder={user.name}>
						</InputField>
						<label htmlFor="user--age">Age:</label>
						<InputField onChange={this.onFormChange}  className="mb2"  type="text" name="user--age" id="user--age"
						            placeholder={user.age}>
						</InputField>
						<div>
							<button onClick={() => this.onProfileUpdate({name, age})}>Save</button>
							<button onClick={this.props.toggleModal}>Cancel</button>
						</div>
					</FormWrapper>
				</RegisterForm>
				<div className="modal--close" onClick={this.props.toggleModal}>&times;</div>
			</div>
		)
	}
}

export default Profile;