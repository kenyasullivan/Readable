import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
// import { fetchPost, editPost } from "../../actions";

class PostEditForm extends Component {
  // state = {
  //   formData: {
  //     id: this.props.post.id,
  //     title: this.props.post.title,
  //     body: this.props.post.body,
  //   },
  //   errors: {},
  //   _loading: false,
  // };

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        id: this.props.post.id,
        title: this.props.post.title,
        body: this.props.post.body
      },
      errors: {},
      _loading: false
    };
  }

  onInputChange = (e, { name, value, error }) => {
    const formData = this.state.formData;
    const errors = this.state.errors;

    formData[name] = value;
    errors[name] = error;

    this.setState({ formData, errors });
  };

  onSubmit = () => {
    const errors = this.validate(this.state.formData);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.formData);
    }
  };
  validate = formData => {
    const errors = {};
    if (!formData.title) errors.title = "Please enter a title";
    if (!formData.body) errors.body = "Post body can not be blank";

    return errors;
  };

  render() {
    // destructor this.state
    const { errors } = this.state;

    return (
      <div className="ui container">
        <Form onSubmit={this.onSubmit}>
          <Form.Field
            error={!!errors.title}
            label="Title"
            type="text"
            control={Input}
            id="title"
            name="title"
            placeholder="Post Title"
            value={this.state.formData.title || ""}
            onChange={this.onInputChange}
          />
          {errors.title && <InlineError text={errors.title} />}

          <Form.Field
            error={!!errors.body}
            id="body"
            name="body"
            control={TextArea}
            label="Post Body"
            placeholder="Enter your thoughts..."
            value={this.state.formData.body || ""}
            onChange={this.onInputChange}
          />
          {errors.body && <InlineError text={errors.body} />}

          <Button primary>Save</Button>
        </Form>
      </div>
    );
  }
}

PostEditForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default PostEditForm;
