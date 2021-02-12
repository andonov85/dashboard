import { useState, useEffect } from 'react';
import moment from 'moment';
import { debounce } from 'lodash';
import { connect } from "react-redux";
import { getIGDB } from "../redux/selectors";
import { fetchAccessToken } from "../redux/actions";
import BeatLoader from "react-spinners/BeatLoader";
import Scrollbar from "react-scrollbars-custom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import igdb from '../api/igdb';
import Item from '../styled-components/composite/Item';
import { Box } from '../styled-components/Layout';
import { Par, Title, Text } from '../styled-components/Typography';
import { Divider } from '../styled-components/Utils';

import nocover from '../assets/images/nocover.jpg';

function composeItems(items = []) {
    return items.map(item => {
        if (item.cover && item.cover.url) {
            item.cover.url = item.cover.url.replace('t_thumb', 't_cover_big');
        }
        return item;
    });
}

function Notifications() {
    const [name, setName] = useState('');
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function fetchGameData() {
            setLoading(true);

            const response = await igdb.v4('/multiquery', `
                query games/count "Games count" {
                    fields *, cover.url;
                    where name ~ *"${name}"*;
                    limit ${limit};
                    offset ${offset};
                };
                query games "Games with covers" {
                    fields *, cover.url;
                    where name ~ *"${name}"*;
                    limit ${limit};
                    offset ${offset};
                };
            `)
            .catch(console.error);
            console.log(response.data)

            if (!ignore) {
                setLoading(false);
                if (offset === 0) {
                    setItems(composeItems(response.data[1].result));
                } else {
                    setItems([...items, ...composeItems(response.data[1].result)]);
                }
                setTotalResults(response.data[0].count);
            }
        }

        fetchGameData();

        return () => { ignore = true }
    }, [offset, name]);

    const addNextPageResults = () => {
        setOffset(offset + limit);
    }

    const debounceName = debounce(name => {
        setName(name);
        setOffset(0);
    }, 1000);

    const handleInput = (e) => {
        setLoading(true);
        debounceName(e.target.value);
    }

    return (
        <Box>
            <Scrollbar style={{ width: "auto", height: "100%" }}>
                <Title>
                    {items.length} results from { totalResults }
                    <span style={{ margin: '10px', cursor: 'pointer' }} onClick={addNextPageResults}>
                        <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                    </span>
                </Title>
                <Par>
                    <input type="text" onInput={handleInput} />
                    <Text bold color="Violet" style={{marginLeft: '15px'}}>{ name }</Text>
                </Par>

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
                    loading &&
                    <div style={{ textAlign: 'center' }}>
                        <BeatLoader loading={loading} size={15} />
                    </div>
                }
            </Scrollbar>
        </Box>
    );
}

const mapStateToProps = state => {
    const igdb = getIGDB(state.rootReducer);
    return { igdb };
}

export default connect(
    mapStateToProps,
    { fetchAccessToken }
)(Notifications);