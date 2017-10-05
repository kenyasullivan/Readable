import { combineReducers } from 'redux';
import PostReducer from './postReducer.js';


const rootReducer = combineReducers({
  posts: PostReducer
});

export default rootReducer;
