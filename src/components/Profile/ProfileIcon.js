import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import styled from 'styled-components';

const DropDownItem = styled(DropdownItem)`
	font-size: 1.6rem;
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
			<div className="pa4 tc">
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle
						tag="span"
						data-toggle="dropdown"
						aria-expanded={this.state.dropdownOpen}
					>
						<img src="https://tachyons.io/img/logo.jpg" className="br-100 h3 w3 dib" alt="avatar"/>
					</DropdownToggle>
					<DropdownMenu right className="b--transparent shadow-5 mt-2">
						<DropDownItem onClick={this.props.toggleModal}>Profile</DropDownItem>
						<DropDownItem onClick={() => this.props.onRouteChange('signout')}>Sign out</DropDownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		)
	}
}

export default ProfileIcon;