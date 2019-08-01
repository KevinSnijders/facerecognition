import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
import styled from 'styled-components';

const Nav = styled.nav`
	display: flex;
`;

const Navigation = ({onRouteChange, isSignedIn, toggleModal}) => {
	if (isSignedIn) {
		return (
			<Nav>
				<ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
			</Nav>
		)
	} else {
		return null
	}

};

export default Navigation;