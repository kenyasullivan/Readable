import React, { Component } from 'react';




const EditPostPage = (props) => {
console.log(props)
return (

  <div>Editing the post with {props.match.params.id}</div>
)
}

export default EditPostPage;