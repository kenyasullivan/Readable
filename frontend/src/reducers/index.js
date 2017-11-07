import { combineReducers } from "redux";
import PostReducer from "./postReducer.js";
import CategoryReducer from "./categoryReducer.js";
import CommentReducer from "./commentsReducer.js";
import SortReducer from "./filtersReducer";

const rootReducer = combineReducers({
  posts: PostReducer,
  categories: CategoryReducer,
  comments: CommentReducer,
  sortBy: SortReducer
});

export default rootReducer;
