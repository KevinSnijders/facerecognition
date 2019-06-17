import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
import styled from 'styled-components';
import Paragraph from '../../shared/Paragraph';

const Nav = styled.nav`
	display: flex;
`;

const NavParagraph = styled(Paragraph)`
	background-color: ${props => props.theme.primaryFormBg};
	border-radius: ${props => props.theme.borderRadius};
	padding: .8rem 1rem
	margin: 0;
	
	&:not(:last-child) {
		margin-right: .8rem;
	}
	
	&:hover {
		background-color: #fff;
	}
`;

const Navigation = ({onRouteChange, isSignedIn, toggleModal}) => {
	if (isSignedIn) {
		return (
			<Nav>
				<ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
			</Nav>
		)
	} else {
		return (
			<Nav>
				<NavParagraph onClick={() => onRouteChange('signin')}>Sign in</NavParagraph>
				<NavParagraph onClick={() => onRouteChange('register')}>Register</NavParagraph>
			</Nav>
		)
	}

};

export default Navigation;