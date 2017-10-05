import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

//pass in initial state, and action
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id') //expect [post1, post2]
    default:
    return state;
  }
}