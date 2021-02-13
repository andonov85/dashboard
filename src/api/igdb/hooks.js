import { useState, useEffect } from 'react';
import igdb from './igdb';

function composeItems(items = []) {
    return items.map(item => {
        if (item.cover && item.cover.url) {
            item.cover.url = item.cover.url.replace('t_thumb', 't_cover_big');
        }
        return item;
    });
}

function useFetchGameData() {
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState();
    const [pending, setPending] = useState();

    const [name, setName] = useState('');
    const [limit] = useState(10);
    const [offset, setOffset] = useState(0);

    const addNextItems = () => {
        setOffset(offset + limit);
    }

    const searchItems = (name) => {
        setName(name);
        setOffset(0);
    }

    useEffect(() => {
        let ignore = false;

        async function fetchGameData() {
            setPending(true);

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
            .catch(err => setError(err));

            if (!ignore) {
                setPending(false);
                if (offset === 0) {
                    setItems(composeItems(response.data[1].result));
                } else {
                    setItems([...items, ...composeItems(response.data[1].result)]);
                }
                setTotalItems(response.data[0].count);
            }
        }

        fetchGameData();

        return () => { ignore = true }
    }, [offset, name]);

    return { items, totalItems, addNextItems, searchItems, pending, error };
}

export { useFetchGameData };