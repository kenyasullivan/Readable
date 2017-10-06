import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class CreatePosts extends Component {
 
    
      
  
  render(){
    return (
      <div>Hello</div>
    )
  }
}

export default reduxForm({
  form: 'CreateNewPostForm'
})(CreatePosts);