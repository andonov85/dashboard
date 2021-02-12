import { FETCH_ACCESS_TOKEN } from "./actionTypes";

export const fetchAccessToken = payload => {
  return {
    type: FETCH_ACCESS_TOKEN,
    payload
  }
}
