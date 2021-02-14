import styled from 'styled-components';
import { FlexContainer } from '../Layout';
import { Text } from '../Typography';

const Icon = styled.span`
    margin-right: 15px;
    font-size: 2.3rem;
    color: ${props => props.color || ''};
`;

const Item = ({ title, text, icon, iconColor }) => {
    return (
        <FlexContainer height="100%" justifyContent="center" alignItems="center">
            <div>
                <Icon color={iconColor}>{icon}</Icon>
            </div>
            <div>
                <Text display="block" color="grey">{ title }</Text>
                <Text display="block" bold>{ text }</Text>
            </div>
        </FlexContainer>
    )
}

export default Item;