import React from 'react';
import styled from 'styled-components';
import {Form, FormWrapper} from '../../shared/Form';
import Button from '../../shared/Button';
import IconInputField from '../../shared/Icon';
import UserIcon from '../../assets/svg/icons/user.svg'
import defaultProfile from '../../assets/png/profile-default.png';

const ProfileModal = styled.div`
	background-color: rgba(0, 0, 0, 0.75);
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	
	h3, p {
		margin: 0;
	}
`;

const ProfileImage = styled.img`
	background-color: #fff;
	width: 5rem;
	height: 5rem;
	margin-right: .8rem;
	border-radius: 100%;
	cursor: pointer;
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
	padding-bottom: ${props => props.theme.gap};
`;

const ImagesSubmitted = styled.h4`
	font-style: italic;
    padding-bottom: 1.6rem;
    font-size: 1.4rem;
    margin: 0;
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
				<Form>
					<FormWrapper top>
						<UserDetails>
							<ProfileImage src={defaultProfile} alt="avatar"/>
							<div>
							<h3>{this.state.name}</h3>
							<p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
							</div>
						</UserDetails>
						<ImagesSubmitted>{`Images submitted: ${user.entries}`}</ImagesSubmitted>
						<IconInputField src={UserIcon} onChange={this.onFormChange} className="mb2" type="text" name="user--name"
						            id="user--name"
						            placeholder={user.name}>
						</IconInputField>
						<div className="d-flex">
							<SaveButton className="btn-lg"
							            onClick={() => this.onProfileUpdate({name, age})}>Save</SaveButton>
							<CancelButton className="btn btn-light btn-lg"
							              onClick={this.props.toggleModal}>Cancel</CancelButton>
						</div>
					</FormWrapper>
					<ModalClose onClick={this.props.toggleModal}>&times;</ModalClose>
				</Form>
			</ProfileModal>
		)
	}
}

export default Profile;