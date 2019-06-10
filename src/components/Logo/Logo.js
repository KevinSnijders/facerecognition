import React from 'react';
import styled from 'styled-components';
import Tilt from 'react-tilt';
import brain from './brain.png'

const TiltLogo = styled(Tilt)`
	background: linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%);
    box-shadow: 0 0 8px 2px rgba( 0, 0, 0, .2 );
    overflow: hidden;
    padding: .8rem;
`;

const Logo = () => {
	return (
		<TiltLogo className="Tilt" options={{max: 55}}>
			<img src={brain} alt="brain"/>
		</TiltLogo>
	)
};

export default Logo;