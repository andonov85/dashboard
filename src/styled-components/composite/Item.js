import styled from 'styled-components';
import { FlexContainer } from '../Layout';
import { Text, Title, MiddleDot } from '../Typography';
import CustomPopover from './Popover';

const Image = styled.img`
    margin-right: 10px;
    object-fit: cover;
    height: ${props => props.height || "100%"};
    width: ${props => props.width || "100%"};
    border-radius: 12px;
`;

const Item = ({ title, text, img, date, url }) => {
    return (
        <FlexContainer>
            <div>
                <CustomPopover
                    content={
                        <div>
                            <Image style={{maxHeight: "450px", maxWidth: "350px"}} src={ img } alt=""/>
                        </div>
                    }
                >
                    <Image height="60px" width="60px" src={ img } alt=""></Image>
                </CustomPopover>
            </div>
            <div>
                <Title display="block" style={{margin: 0}}><a target="_blank" rel="noopener noreferrer" href={url}>{ title }</a></Title>
                <FlexContainer>
                    <Text color="#ff6968">{ text }</Text>
                    <MiddleDot />
                    <Text >{ date }</Text>
                </FlexContainer>
            </div>
        </FlexContainer>
    )
}

export default Item;