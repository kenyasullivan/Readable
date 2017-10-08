import axios from 'axios';
import uuid from 'uuid'

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POSTS = 'CREATE_POSTS'
export const FETCH_POST = 'FETCH_POST';

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

  const request = axios.post(`${ROOT_URL}/posts`, values) //request to server
    
      return dispatch => {
        request.then(({values}) => {
          dispatch({type: CREATE_POSTS, payload: request})
          callback()  //callback to handle redirect after posts are added to page
        }) 
      }
}

export function fetchPost (id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`);
  return dispatch => {
    request.then(({data})=> {
      dispatch({type: FETCH_POST, payload: data})
    });
  }
}

