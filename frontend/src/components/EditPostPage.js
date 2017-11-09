import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editPost } from "../actions";
import PostEditForm from "../components/forms/PostEditForm";

const EditPostPage = props => {
  console.log(props);
  return (
    <div className="container">
      <Link to="/">Back to Home</Link>
      <br />
      <h3>Edit Post</h3>
      <PostEditForm
        post={props.post}
        submit={post => {
          props.editPost(props.post.id, post);
          props.history.push("/");
        }}
      />
    </div>
  );
};

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { editPost })(EditPostPage);
