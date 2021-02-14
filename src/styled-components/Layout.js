import styled from 'styled-components';

const FlexContainer = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent || "left"};
    align-items: ${props => props.height || "flex-start"};
    flex-direction: ${props => props.direction || "row"};
`;

const OuterBox = styled.section`
    display: inline-block;
    background-color: white;
    border-radius: 16px;
    height: 100%;
    width: ${props => props.width || "100%"};
`;

const InnerBox = styled.div`    
    position: absolute;
    padding: ${props => props.padding || "1rem"};
    inset: 0 0 0 0;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    flex-grow: 0;
`;
const Body = styled.div`
    width: 100%;
    flex-grow: 1;
`;

function Box({ children, padding }) {
    return (
        <OuterBox>
            <InnerBox padding={padding}>{ children }</InnerBox>
        </OuterBox>
    );
}

export { Box, Header, Body, FlexContainer };