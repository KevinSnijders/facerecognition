import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import styled from 'styled-components';
import defaultProfile from '../../assets/png/profile-default.png';

const DropDownItem = styled(DropdownItem)`
	font-size: 1.6rem;
`;

const ProfileImage = styled.img`
	background-color: #fff;
	width: 5rem;
	height: 5rem;
	border-radius: 100%;
	cursor: pointer;
`;

class ProfileIcon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false
		}
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	};

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle
					tag="span"
					data-toggle="dropdown"
					aria-expanded={this.state.dropdownOpen}
				>
					<ProfileImage src={defaultProfile} alt="avatar"/>
				</DropdownToggle>
				<DropdownMenu right>
					<DropDownItem onClick={this.props.toggleModal}>Profile</DropDownItem>
					<DropDownItem onClick={() => this.props.onRouteChange('signout')}>Sign out</DropDownItem>
				</DropdownMenu>
			</Dropdown>
		)
	}
}

export default ProfileIcon;