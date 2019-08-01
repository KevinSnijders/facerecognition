import React from 'react';
import {Form, FormWrapper} from '../../shared/Form';
import InputField from '../../shared/InputField';
import Button from '../../shared/Button';
import styled from 'styled-components';


const ProfileForm = styled(Form)`
	margin-top: 10rem;
`;

const ProfileModal = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SaveButton = styled(Button)`
	padding: 1.2rem 0;
    margin-right: .8rem;
`;

const CancelButton = styled(Button)`
	padding: 1.2rem 0;
    margin-left: .8rem;
`;

const ModalClose = styled.div`
	font-size: 2.5rem;
    font-weight: 700;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: .8rem;
    line-height: normal;
	&:hover {
		color: grey;
	}
`;

const UserDetails = styled.div`
	display: flex;
	align-items: center;
`;

const UserLabel = styled.label`
    font-size: 1.4rem;
`;

class Profile extends React.Component {
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
		switch (name) {
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
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({formInput: data})
		})
			.then(response => {
				if (response.status === 200 || response.status === 304) {
					this.props.toggleModal();
					this.props.loadUser({...this.props.user, ...data});
				}
			})
			.catch(console.log)
	};

	render() {
		const {user} = this.props;
		const {name, age} = this.state;
		return (
			<ProfileModal>
				<ProfileForm>
					<FormWrapper top>
						<UserDetails>
							<img src="http://tachyons.io/img/logo.jpg" className="br-100 h3 w3 mr3 dib" alt="avatar"/>
							<h1>{this.state.name}</h1>
						</UserDetails>
						<h4>{`Images submitted: ${user.entries}`}</h4>
						<p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
						<UserLabel htmlFor="user--name">Name:</UserLabel>
						<InputField onChange={this.onFormChange} className="mb2" type="text" name="user--name"
						            id="user--name"
						            placeholder={user.name}>
						</InputField>
						<UserLabel htmlFor="user--age">Age:</UserLabel>
						<InputField onChange={this.onFormChange} className="mb2" type="text" name="user--age"
						            id="user--age"
						            placeholder={user.age}>
						</InputField>
						<div className="d-flex mt-4 mb-3">
							<SaveButton className="btn btn-danger btn-lg"
							            onClick={() => this.onProfileUpdate({name, age})}>Save</SaveButton>
							<CancelButton className="btn btn-light btn-lg"
							              onClick={this.props.toggleModal}>Cancel</CancelButton>
						</div>
					</FormWrapper>
					<ModalClose onClick={this.props.toggleModal}>&times;</ModalClose>
				</ProfileForm>
			</ProfileModal>
		)
	}
}

export default Profile;