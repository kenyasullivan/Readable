import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { editPost } from "../actions";
import PostEditForm from "../components/forms/PostEditForm";

const EditPostPage = props => {
  console.log(props);
  return (
    <div>
      <h1>Edit Post</h1>
      <PostEditForm
        post={props.post}
        submit={post => {
          // dispatch action to edit the expense
          props.editPost(props.post.id, post);
          // redirect to home page
          props.history.push("/");
        }}
      />
    </div>
  );
};

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }; //returns only the single post needed.
}
export default connect(mapStateToProps, { editPost })(EditPostPage);
