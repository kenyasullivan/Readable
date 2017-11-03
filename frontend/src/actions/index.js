import axios from "axios";
import uuid from "uuid";

export const FETCH_POSTS = "FETCH_POSTS";
export const CREATE_POSTS = "CREATE_POSTS";
export const FETCH_POST = "FETCH_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

const ROOT_URL = "http://localhost:3001";
const AUTH = { headers: { Authorization: "Its me!" } };
axios.defaults.headers.common["Authorization"] = AUTH;
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
    request.then(({ data }) => {
      dispatch({ type: FETCH_POSTS, payload: data });
    });
  }; //end dispatch
} //end fetchPosts

// export function createPosts(values, callback) {

//   const request = axios.post(`${ROOT_URL}/posts`, values) //request to server

//       return dispatch => {
//         request.then(({values}) => {
//           dispatch({type: CREATE_POSTS, payload: request})
//           callback()  //callback to handle redirect after posts are added to page
//         })
//       }
// }
export function createPosts(values, callback) {
  const { title, body, author, category } = values;

  const data = {
    id: uuid.v4(),
    timestamp: Date.now(),
    title,
    author,
    category,
    body
  };
  const request = axios.post(`${ROOT_URL}/posts`, data); // request to server
  return dispatch => {
    request.then(response => {
      dispatch({
        type: CREATE_POSTS,
        payload: response.data
      });
      // callback();
    });
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_POST, payload: data });
    });
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}`);
  return dispatch => {
    request.then(({ id }) => {
      dispatch({ type: DELETE_POST, payload: id });
      callback(); //callback to handle redirect after posts are added to page
    });
  };
}

export function editPost(id, updates) {
  const request = axios.put(`${ROOT_URL}/posts/${id}`, updates);
  return dispatch => {
    request.then(response => {
      dispatch({ type: EDIT_POST, payload: updates });
    });
  };
}

//= ====Categories====//
export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`);
  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_CATEGORIES, payload: data });
    });
  }; // end dispatch
} // end fetchPosts
