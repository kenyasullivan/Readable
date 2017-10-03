import uuid from 'uuid';
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'

//ADD_POST
export const addPost = (
    {
        title = '',
        body = '',
        author= '',
        category = '',
        voteScore=0}={}) => ({
    type: 'ADD_POST',
    post: {
        id: uuid(),
        title,
        body,
        author,
        category,
        voteScore
    }
})

//REMOVE_POST
export const removePost = (({id}={})=> {
type: 'REMOVE_POST',
id
})

//EDIT_POST
export const editPost = (id, updates) => ({
    type: 'EDIT_POST',
    id,
    updates
})