import { useState } from 'react';
import moment from 'moment';
import { debounce } from 'lodash';
import BeatLoader from "react-spinners/BeatLoader";
import Scrollbar from "react-scrollbars-custom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { useFetchGameData } from '../api/igdb/hooks';
import Item from '../styled-components/composite/Item';
import { Box, Header, Body, FlexContainer } from '../styled-components/Layout';
import { Par, Title, Text } from '../styled-components/Typography';
import { Divider } from '../styled-components/Utils';

import nocover from '../assets/images/nocover.jpg';

function Notifications() {
    const { items, totalItems, addNextItems, filterItems, pending, error } = useFetchGameData();
    const [name, setName] = useState();

    const handleInput = (value) => {
        filterItems(value);
    }

    const handleKeyUp = (e) => {
        setName(e.target.value);
    }

    return (
        <Box>
            <Header>
                <Title>
                    {items && items.length} results from { totalItems }
                    <span style={{ margin: '10px', cursor: 'pointer' }} onClick={addNextItems}>
                        <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                    </span>
                </Title>
                <Par>
                    <input type="text" onInput={debounce(e => handleInput(e.target.value), 1000)} onKeyUp={handleKeyUp} />
                    <Text bold color="violet" style={{marginLeft: '15px'}}>{ name }</Text>
                </Par>
                { error && <Par color="red">{ error }</Par> }
            </Header>
            <Body>
                <Scrollbar style={{ width: "auto", height: "100%" }}>
                    {
                        items.map((item, index) => {
                            const { name, price = 'n/a', currencySign = 'n/a', cover, url, first_release_date } = item;
                            return (
                                <div key={`id-${item.id}/index-${index}`}>
                                    <Item title={name} text={`${price} ${currencySign}`} url={url} img={cover ? cover.url : nocover} date={first_release_date ? moment(first_release_date).format('MMM D, YYYY') : 'n/a'}></Item>
                                    {index !== items.length - 1 ? <Divider /> : null}
                                </div>
                            )
                        })
                    }
                    {
                        pending &&
                        <div style={{ textAlign: 'center' }}>
                            <BeatLoader loading={pending} size={15} />
                        </div>
                    }
                </Scrollbar>
            </Body>
        </Box>
    );
}

export default Notifications;