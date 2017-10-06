import { combineReducers } from 'redux';
import PostReducer from './postReducer.js';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;
