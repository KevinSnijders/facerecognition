import React from 'react';
import styled from 'styled-components';

const FaceRecognitionWrapper = styled.div`
	display: flex;
    justify-content: center;
`;

const ImageWrapper = styled.div`
	position: absolute;
`;

const Image = styled.img`
	width: 700px;
	max-width: 100%;
	height: auto;
	border-radius: ${props => props.theme.borderRadius}
`;

const BoundingBox = styled.div`
	position: absolute;
    box-shadow: 0 0 0 3px #149df2 inset;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
`;


const FaceRecognition = ({imageUrl, boxes}) => {
	console.log(boxes);
	return (
		<FaceRecognitionWrapper>
			{imageUrl !== '' ?
				<ImageWrapper>
					<Image id="inputimage" src={imageUrl} alt="face"/>
					{boxes.map((box, i) => {
						return <BoundingBox key={i}
							style={{
								left: box.leftCol,
								top: box.topRow,
								right: box.rightCol,
								bottom: box.bottomRow
							}}>
						</BoundingBox>
					})
					}
				</ImageWrapper> :
				null
			}
		</FaceRecognitionWrapper>
	)
};

export default FaceRecognition;

