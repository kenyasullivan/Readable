//posts reducer
const postsReducerDefaultState = [];

const postsReducer = (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.expense];
    case 'REMOVE_POST':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};