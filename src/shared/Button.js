import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    background-color: ${props => props.theme.primaryColor};
    color: #FFF;
    border: 2px solid ${props => props.theme.primaryColor};
    transition: transform, background-color .15s ease-out;
    cursor: pointer;
    font-size: ${props => props.theme.fontSize};
    border-radius: ${props => props.theme.borderRadius};

    &:disabled {
       cursor: not-allowed;
       &:hover {
        background-color: ${props => props.theme.primaryColor};
       }
    }

    &:hover {
        background-color: ${props => props.theme.primaryColorDrk};
    }
    
    &:active {
        background-color: ${props => props.theme.primaryColor};
        transform: translateY(2px);
    }
`;

export default Button;