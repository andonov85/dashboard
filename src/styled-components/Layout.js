import styled from 'styled-components';

const FlexContainer = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent || "left"};
    align-items: center;
    height: ${props => props.height || "initial"};
`;

const OuterBox = styled.section`
    overflow: auto;
    display: inline-block;
    background-color: white;
    border-radius: 16px;
    // box-shadow: 0px 0px 16px -7px rgba(0,0,0,0.35);
    height: ${props => props.height || "100%"};
    width: ${props => props.width || "100%"};
`;

const InnerBox = styled.div`    
    position: absolute;
    padding: ${props => props.padding || "1rem 1.5rem"};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
`;

function Box({ children, padding }) {
    return (
        <OuterBox>
            <InnerBox padding={padding}>{ children }</InnerBox>
        </OuterBox>
    );
}

export { Box, FlexContainer };