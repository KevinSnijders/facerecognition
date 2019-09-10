import React from 'react';
import styled from 'styled-components';

import {Form, FormWrapper} from '../../shared/Form';
import Button from '../../shared/Button';
import IconInputField from '../../shared/Icon';
import ImageIcon from '../../assets/svg/icons/add_image.svg'
const FormImageLink = styled(Form)`
	width: 700px;
	margin: 1.8rem auto 1.2rem;
`;

const ImageLinkFormTitle = styled.h3`
	font-size: 1.8rem;
    font-weight: 300;
    line-height: 2.4rem;
    letter-spacing: .2px;
    margin-bottom: 1.2rem;
`;

const ImageLinkFormFlex = styled.div`
	display: flex;
`;

const ImageLinkFormInput = styled(IconInputField)`
	flex: 0 0 75%;
	margin-bottom: 0;
	border-radius: 0;
`;

const ImageLinkFormButton = styled(Button)`
	border-radius: 0;
	&:active {
		transform: translateY(0);
	}
`;

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<FormImageLink>
			<FormWrapper>
				<ImageLinkFormTitle>
					{`This Magic Brain will detect faces in your pictures.`}
				</ImageLinkFormTitle>
				<ImageLinkFormFlex>
					<ImageLinkFormInput src={ImageIcon} type="text" placeholder="Image url" label="Image url" onChange={onInputChange}/>
					<ImageLinkFormButton onClick={onButtonSubmit}>Detect faces</ImageLinkFormButton>

				</ImageLinkFormFlex>
			</FormWrapper>
		</FormImageLink>
	)
};

export default ImageLinkForm;