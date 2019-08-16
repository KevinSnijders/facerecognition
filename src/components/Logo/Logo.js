import React from 'react';
import styled from 'styled-components';
import brain from '../../assets/png/brain.png'

const BrandLogo = styled.div`
    overflow: hidden;
`;

const Logo = () => {
	return (
		<BrandLogo>
			<img src={brain} alt="brain"/>
		</BrandLogo>
	)
};

export default Logo;