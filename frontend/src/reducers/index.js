import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostReducer from "./postReducer.js";
import CategoryReducer from "./categoryReducer.js";

const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer,
  categories: CategoryReducer
});

export default rootReducer;
