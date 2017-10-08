import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

//Connect Action Creator
import { connect } from 'react-redux';
import { createPosts } from '../actions';

class PostsCreate extends Component {
	renderField(field) {
		const {meta: {touched, error}} = field;
		const className = `form-group ${touched && error ? "has-danger" : ""}`;
		return (
				<div className={className}>
					<label>{field.label}</label>
					<input className="form-control" type="text" {...field.input} />
					<div className="text-help">{touched ? error : ''}</div>
				</div>			
		);
	}

	renderCategoryField(field) {
	//	const {categories} = this.props;
		const {meta: {touched, error}} = field;
		const className = touched && error ? 'error' : null;
		
		return (
			<div className={className}>
				<label>{field.label}</label>
				<select className="form-control " {...field.input} >
					<option value="" className="disabled">
						Select Category
					</option>
						<option>React </option>
            <option>Redux</option>
            <option>Udacity</option>
					))}
				</select>
				<div className="text-help">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
    console.log(values);
    this.props.createPosts(values, ()=> {
      this.props.history.push('/')
    });
		};
	

	render() {
		const {handleSubmit} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Title" name="title" component={this.renderField} />
				<Field label="Content" name="body" component={this.renderField} />
				<Field label="Author" name="author" component={this.renderField} />
				<Field label="Category" name="category" component={this.renderCategoryField}
				>
				</Field>
				<br />
				<button type="submit" className="btn btn-primary">
        Save
      </button>
				<Link to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};
	if (!values.title) {
		errors.title = 'Title missing';
	}
	if (!values.author) {
		errors.author = 'Author missing';
	}
	if (!values.body) {
		errors.body = 'Body missing';
	}
	if (!values.category) {
		errors.category = 'Category missing';
	}
	return errors;
}
// function mapStateToProps(state) {
// 	return {categories: state.categories.all};
// }

export default reduxForm({
	validate,
  form: 'CreateNewPostForm'
})(
  connect(null, { createPosts })(PostsCreate)
)

