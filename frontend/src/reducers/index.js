import { createStore, combineReducers } from 'redux';
import {
    ADD_POST,
    REMOVE_POST,
    EDIT_POST
} from '../actions'

//create Reducers for Posts and Comments, ?Votes
//1. Create reducer
//2 Set initial state. (Initial state for posts will be posts (from API), but set to an empty array for now)
const postsReducerDefaultState = {
  id: '',
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0
}
export const postsReducer = (state = postsReducerDefaultState, action) => {
switch (action.type) {
    case 'ADD_POST':
    return [
        ...state,
        action.post
    ];
    case 'REMOVE_POST':
    return state.filter(({id}) => {
        return id !== action.id;
    })
    case 'EDIT_POST':
    return state.map((post)=>{
        if(post.id === action.id){
            return {
                ...post,   //return all existing post properties
                ...action.updates // update any post properties that are changing
            }
        } else {
           return post;  // not match just return the existing post without changes
        }
    })
    default:
    return state;
}

}

const commentsReducerInitialState = [];
export const commentsReducer = (state = commentsReducerInitialState, action) => {
return state;
}

//Store Creation
const store = createStore(
    combineReducers({
       posts: postsReducer,
       comments: commentsReducer
    })
)

