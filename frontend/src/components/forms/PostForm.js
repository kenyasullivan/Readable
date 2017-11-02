import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Input, TextArea, Select, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import { createPosts } from "../../actions";

const options = [
  { name: "react", value: "react", text: "React" },
  { name: "redux", value: "redux", text: "Redux" },
  { name: "udacity", value: "udacity", text: "Udacity" }
];

class PostForm extends Component {
  state = {
    formData: {
      title: " ",
      author: " ",
      body: " ",
      category: null
    },
    errors: {},
    _loading: false
  };

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
    if (!formData.author) errors.author = "Please enter your name";
    if (!formData.body) errors.body = "Post body can not be blank";
    if (!formData.category) errors.body = "Select a category";
    return errors;
  };

  render() {
    // destructor this.state
    const { errors } = this.state;

    return (
      <div>
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
            error={!!errors.author}
            label="Author"
            type="text"
            control={Input}
            id="author"
            name="author"
            placeholder="Post Author"
            value={this.state.formData.author || ""}
            onChange={this.onInputChange}
          />
          {errors.author && <InlineError text={errors.author} />}

          <Form.Field
            error={!!errors.category}
            control={Select}
            options={options}
            name="category"
            placeholder="Select a Category"
            label="Category"
            value={this.state.formData.category || ""}
            onChange={this.onInputChange}
          />
          {errors.category && <InlineError text={errors.category} />}
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

PostForm.propTypes = {
  submit: PropTypes.func.isRequired
};
export default connect(null, { createPosts })(PostForm);
