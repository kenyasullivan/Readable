

//ADD_POST
const addPost = (
    {
     id='',
     title='',
     body='',
     author='',
     category='Redux'}
    ) => ({
    type: 'ADD_POST',
    post: {
    id,
    title,
    body,
    author,
    category
    }
})
//EDIT_POST
//DELETE_POST

// REMOVE_EXPENSE
export const removePost = ({ id } = {}) => ({
    type: 'REMOVE_POST',
    id
  });
