import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../shared/Paragraph';

const Nav = styled.nav`
	display: flex;
`;

const NavParagraph = styled(Paragraph)`
	background-color: ${props => props.theme.primaryFormBg};
	border-radius: ${props => props.theme.borderRadius};
	font-size: 1.8rem;
	padding: 1.2rem 1.6rem
	margin: 0;
	
	&:not(:last-child) {
		margin-right: 1.2rem;
	}
	
	&:hover {
		background-color: #fff;
	}
`;

const Navigation = ({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return (
			<Nav>
				<NavParagraph onClick={() => onRouteChange('signout')}>Sign
					out</NavParagraph>
			</Nav>
		)
	} else {
		return null
	}

};

export default Navigation;