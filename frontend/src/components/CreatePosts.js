import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

//Connect Action Creator
import { connect } from 'react-redux';
import { createPosts } from '../actions';

class CreatePosts extends Component {
  renderField(field){
    
        const { meta: { touched, error } } = field;
    
        const className=`form-group ${touched && error ? 'has-danger': ''}`
        return (
          <div className={className}>
          <label>{field.label}</label>
          <input 
            className="form-control"
            type="text"
            {...field.input}
          />
          <div className="text-help">{touched ? error : ''}</div>
          </div>
        )
      }
    //Form submisson helper - reduxForm adds additional props passed to component/ 
    //HandleSubmit takes our helper function and gives us the values to do something
      onSubmit(values){
        this.props.createPosts(values)
      }
    
      render(){
    
        const { handleSubmit } = this.props; // being passed by reduxForm - its handles state and validation
    
        return (
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field 
            label="Title"
            name="title"
            component={this.renderField}
            />
    
            <Field 
            label="Author"
            name="author"
            component={this.renderField}
            />
    
            <Field 
            label="Post Content"
            name="body"
            component={this.renderField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger"> Cancel</Link>
          </form>
        )
      }
    }
    //called whenever user tries to submit form
    function validate(values) {
    //Expected output: console.log(values -> {title: 'sdfsd', categories: ' dfsdf', content: 'dfgfsgfg})
    //errors object
    const errors = {};
    //validate the inputs from 'values'
    if (!values.title) {
      errors.title="Enter a title!";
    }
    if (!values.categories) {
      errors.categories="Enter some categories";
    }
    if (!values.content) {
      errors.content="Enter some content!";
    }
    //if errors is empty the form is fine to submit
    //If errors has *any* properties, redux for assumes its invalid
    return errors;
    }

export default reduxForm({
  validate,
  form: 'CreateNewPostForm'
}) (
connect(null, { createPosts })(CreatePosts)
);