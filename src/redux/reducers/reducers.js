import { FETCH_ACCESS_TOKEN } from "../actionTypes";
import produce from "immer";

const initState = {
  igdb: {
    authorization: {
      authUrl: 'https://id.twitch.tv/oauth2/token',
      requestParams: {
        client_id: '',
        client_secret: '',
        grant_type: 'client_credentials'
      },
    },
    access_token: null,
  },
}

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ACCESS_TOKEN:
      // return { ...state, igdb: { ...state.igdb, access_token: action.payload } };
      return produce(state, draftState => {
        draftState.igdb.access_token = action.payload;
      })
    default:
      return state;
  }
}