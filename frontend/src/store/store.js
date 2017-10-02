import { createStore, combineReducers } from 'redux';
import postsReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// Store creation

// Export by default a function it will create store and return it. Why?
export default () => {
  const store = createStore(
    combineReducers({
      posts: postsReducer,
      filters: filtersReducer
    })
  );
  return store;
};