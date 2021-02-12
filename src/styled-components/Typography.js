import styled from 'styled-components';

const MiddleDot = styled.span`
    display: inline-block;
    height: 5px;
    width: 5px;
    margin: 0 10px;
    background-color: #bbb;
    border-radius: 50%;
`;

const Title = styled.h3`
    font-weight: 700;
`;

const Text = styled.span`
    display: ${props => props.display || 'inline'};
    font-weight: ${props => props.bold ? 'bold' : ''};
    color: ${props => props.color};
`;

const Par = styled.p`
    font-weight: ${props => props.bold ? 'bold' : ''};
    color: ${props => props.color};
`;

export { Title, Text, Par, MiddleDot };