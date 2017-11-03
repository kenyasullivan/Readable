import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "../components/forms/PostForm";
import { createPosts } from "../actions";

class AddPostPage extends Component {
  // take data from pass thunk action (createPost) with this data, which returns a promise
  // Next redirect back to homepage on submit using R.R. history.
  submit = data => {
    this.props.createPosts(data);
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="container">
      <Link to="/">Back to Home</Link>
      <br/>
        <h3>Add New Post</h3>
        
        <PostForm submit={this.submit} />
      </div>
    );
  }
}

// AddPostPage.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   createPost: PropTypes.func.isRequired,
// };

export default connect(null, { createPosts })(AddPostPage);
