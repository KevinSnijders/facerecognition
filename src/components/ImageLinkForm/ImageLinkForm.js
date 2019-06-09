import React from 'react';
import styled, {css} from 'styled-components';

const BorderRadius = css`
	border-radius: .5rem;
`;

const FormElement = css`
	font-size: 1.6rem;
	padding: 1.2rem;
	${BorderRadius}
`;


const FormBackground = styled.div`
	background-color: rgba(238, 238, 238, 0.8);
	width: 50vw;
    display: flex;
    padding: 2.4rem;
`;

/*const Title = styled.h4`
	color: #333;
	font-size: 1.8rem;
	text-transform: uppercase;
	font-weight: 700;
	text-align: center;
	margin: 2.4rem 0;
`;

const Wrapper = styled.div`
	padding: 1.6rem 2.4rem;
`;
*/

const InputField = styled.input`
	display: flex;
	flex: 2 0 auto;
	background-color: #FFF;
	border: 2px solid #dadada;
	${FormElement}
`;

const Button = styled.button`
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    background-color: #ca3435;
    color: #FFF;
    border: 2px solid #ca3435;
    transition: transform .15s ease-out;
    cursor: pointer;
    ${FormElement}
    
    &:active {
        transform: translateY(2px);
    }
`;

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className="f3">
				{`This Magic Brain will detect faces in your pictures. Give it a try`}
			</p>
			<div className="center">
				<FormBackground>
					<InputField type="text" onChange={onInputChange}/>
					<Button onClick={onButtonSubmit}>Detect</Button>
				</FormBackground>
			</div>
		</div>
	)
};

export default ImageLinkForm;