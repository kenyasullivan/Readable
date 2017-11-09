import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PostForm from "../components/forms/PostForm";
import { createPosts } from "../actions";

class AddPostPage extends Component {
  submit = data => {
    this.props.createPosts(data);
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="container">
        <Link to="/">Back to Home</Link>
        <br />
        <h3>Add New Post</h3>

        <PostForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { createPosts })(AddPostPage);
