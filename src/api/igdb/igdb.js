import axios from 'axios';

const config = {
    client_id: process.env.REACT_APP_IGDB_client_id,
    client_secret: process.env.REACT_APP_IGDB_client_secret,
    authUrl: 'https://id.twitch.tv/oauth2/token',
    access_token: null
};

async function init() {
    config.access_token = getLocalStorageToken() || await refreshLocalStorageToken();
}

function getLocalStorageToken() {
    const tokenObj = JSON.parse(localStorage.getItem('igdb'));
    return tokenObj && !hasExpired(tokenObj) ? tokenObj : null;
}

async function refreshLocalStorageToken() {
    const now = Date.now();
    const response = await makeAuth(config.authUrl);
    const tokenObj = { ...response.data, expires_at: new Date(now + response.data.expires_in * 1000).toJSON() } // milliseconds
    localStorage.setItem('igdb', JSON.stringify(tokenObj));
    return tokenObj;
}

function hasExpired(tokenObj) {
    const now = Date.now();
    const expireDate = new Date(tokenObj.expires_at);
    return now >= expireDate;
}

function makeAuth (url) {
    return axios.request({
        method: 'post',
        url: url,
        params: {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: 'client_credentials'
        },
    })
    .then(res => res)
    .catch(err => console.log(err));
}

const igdb = {
    v4: async (url, fields) => {
        await init();
        if (!config.access_token) throw new Error('Missing access token.');

        return axios.request({
            method: 'post',
            url: url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Client-ID': config.client_id,
                'Authorization': `Bearer ${config.access_token.access_token}`,
            },
            data: fields
        })
    }
};

export default igdb;