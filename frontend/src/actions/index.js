import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';

const ROOT_URL='http://localhost:3001'
const AUTH = {headers:{"Authorization": "Its me!"}}

export function fetchPosts() {
const request = axios.get(`${ROOT_URL}/posts`, AUTH )
    return {
        type: FETCH_POSTS,
        payload: request
    }
}