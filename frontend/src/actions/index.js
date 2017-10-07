import axios from 'axios';
import uuid from 'uuid'

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POSTS = 'CREATE_POSTS'

const ROOT_URL='http://localhost:3001'
const AUTH = {headers:{"Authorization": "Its me!"}}
axios.defaults.headers.common['Authorization'] = AUTH;
// export function fetchPosts() {
// const request = axios.get(`${ROOT_URL}/posts`, AUTH )
//     return {
//         type: FETCH_POSTS,
//         payload: request
//     }
// }

export function fetchPosts() {
 const request = axios.get(`${ROOT_URL}/posts`);
  return dispatch => {
    request.then(({data})=> {
      dispatch({type: FETCH_POSTS, payload: data})
  });
}//end dispatch
}//end fetchPosts

export function createPosts(values, callback) {
  const {title, body, author, category} = values;

  const data = {
    id: uuid(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category,
  };

  return dispatch => {
    axios.post(`${ROOT_URL}/posts`, data).then(res => {
      callback();
      dispatch({type: CREATE_POSTS, payload: res.data});
    });
  };
}
