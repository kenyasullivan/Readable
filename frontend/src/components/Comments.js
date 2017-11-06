import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button, Comment, Form } from "semantic-ui-react";
import {
  fetchComments,
  deleteComment,
  voteComment,
  createComment,
  editComment
} from "../actions";

class Comments extends Component {
  state = {
    formData: {
      author: " ",
      body: this.props.comment ? this.props.comment.body : " ",
      id: null
    }
  };

  componentWillMount() {
    const { fetchComments, postId } = this.props;
    fetchComments(postId);
  }

  deleteComments(id) {
    const { deleteComment, fetchComments, postId } = this.props;

    deleteComment(id, () => {
      fetchComments(postId);
    });
  }
  editComment = comment => {
    const { author, body, id } = comment;
    console.log(comment);
    this.setState({
      formData: {
        author,
        body,
        id
      }
    });
  };

  onInputChange = (e, { name, value }) => {
    const formData = this.state.formData;
    formData[name] = value;
    this.setState({ formData });
  };

  onSubmit(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.createComment(this.state.formData, id);
    this.setState({ formData: "" }); //reset form data
    this.props.history.push(`/posts/${id}`);
  }

  renderComments() {
    return this.props.comments.map(comment => {
      return (
        <Comment key={comment.id}>
          <Comment.Content>
            <Comment.Author as="a">{comment.author} </Comment.Author>
            <Comment.Metadata>
              <div>
                replied{" "}
                <Moment format="MM-DD-YYYY HH:mm">{comment.timestamp}</Moment>
              </div>
            </Comment.Metadata>
            <Comment.Text>{comment.body}</Comment.Text>
            <Comment.Actions>
              <Comment.Action as="a" onClick={() => this.editComment(comment)}>
                Edit
              </Comment.Action>
              <Comment.Action
                as="a"
                onClick={() => this.deleteComments(comment.id)}
              >
                Delete
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderComments()}
        <Form ref="commentForm" onSubmit={this.onSubmit.bind(this)}>
          <Form.Input
            name="author"
            placeholder="Author"
            value={this.state.formData.author || ""}
            onChange={this.onInputChange}
          />
          <Form.TextArea
            name="body"
            placeholder="Comment"
            value={this.state.formData.body || ""}
            onChange={this.onInputChange}
          />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
            type="submit"
          />
        </Form>
      </div>
    );
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
  createComment,
  editComment
})(Comments);
