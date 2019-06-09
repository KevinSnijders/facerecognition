import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	position: absolute;
	top: .8rem;
	right: .8rem; 
	
	p {
		font-size: 1.5rem;
		background-color: ${props => props.theme.primaryFormBg};
		border-radius: ${props => props.theme.borderRadius};
		cursor: pointer;
		color: ${props => props.theme.primaryTextColor}
		padding: .8rem 1rem
		
		&:not(:last-child) {
			margin-right: .8rem;
		}
	}
`;

// TODO Refactor absolute position instead use calc function to center it with just flexbox;

const Navigation = ({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return (
			<Nav>
				<p onClick={() => onRouteChange('signout')}>Sign
					out</p>
			</Nav>
		)
	} else {
		return (
			<Nav>
				<p onClick={() => onRouteChange('signin')}>Sign
					in</p>
				<p onClick={() => onRouteChange('register')}>Register</p>
			</Nav>
		)
	}

};

export default Navigation;