import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Comment, Form } from "semantic-ui-react";
import {
  fetchComments,
  deleteComment,
  voteComment,
  createComment
} from "../actions/index";

class Comments extends Component {
  componentWillMount() {
    const { fetchComments, postId } = this.props;
    fetchComments(postId);
  }

  deleteButton(id) {
    const { deleteComment, fetchComments, postId } = this.props;

    deleteComment(id, () => {
      fetchComments(postId);
    });
  }

  renderComments() {
    // const { comments } = this.props;

    return this.props.comments.map(comment => {
      return (
        <Comment key={comment.id}>
          <Comment.Content>
            <Comment.Author as="a">{comment.author}</Comment.Author>
            <Comment.Metadata>
              <div>{comment.timestamp}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    });
  }

  render() {
    return <div>{this.renderComments()}</div>;
  }
}

function mapStateToProps(state) {
  const comments = _.filter(state.comments, comment => !comment.deleted);
  return { comments };
}

export default connect(mapStateToProps, {
  fetchComments,
  deleteComment,
  voteComment,
  createComment
})(Comments);
