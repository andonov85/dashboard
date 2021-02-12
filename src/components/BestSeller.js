import { useState, useEffect } from 'react';
import moment from 'moment';
import Scrollbar from "react-scrollbars-custom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

import Item from '../styled-components/composite/Item';
import { Box } from '../styled-components/Layout';
import { Title, Par } from '../styled-components/Typography';

const sampleData = [
    {
        name: 'Rust',
        price: '410',
        currencySign: '$',
        imgSrc: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2021/01/Rust-Screenshot-1.jpg',
        date: '2011-10-05T14:48:00.000Z',
        description: 'Rust is a multiplayer-only survival video game developed by Facepunch Studios. Rust was first released in early access in December 2013 and received its full release in February 2018. Rust is available on Microsoft Windows and macOS.'
    }
];

function BestSeller() {
    const [items, setItems] = useState(sampleData);

    return (
        <Box>
            <Scrollbar style={{ width: "auto", height: "100%" }}>
                <Title>Best sellers</Title>
                {
                    items.map((item, index) => {
                        const { name, price, currencySign, imgSrc, date } = item;
                        return (
                            <div key={name + index}>
                                <Item
                                    title={name}
                                    text={`${price}
                                    ${currencySign}`}
                                    img={imgSrc}
                                    date={moment(date).format('MMM D, YYYY')}
                                />
                                <FontAwesomeIcon style={{color: '#fd7e14', fontSize: '1.5rem'}} icon={faStar}></FontAwesomeIcon>
                            </div>
                        )
                    })
                }
                <Par>{ items[0].description }</Par>
            </Scrollbar>
        </Box>
    );
}

export default BestSeller;