import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
import PostReducer from "./postReducer.js";
import CategoryReducer from "./categoryReducer.js";
import CommentReducer from "./commentsReducer.js";

const rootReducer = combineReducers({
  posts: PostReducer,
  // form: formReducer,
  categories: CategoryReducer,
  comments: CommentReducer
});

export default rootReducer;
