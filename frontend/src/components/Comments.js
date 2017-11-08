import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button, Comment, Form } from "semantic-ui-react";
import {
  fetchComments,
  deleteComment,
  voteForComment,
  createComment,
  editComment
} from "../actions";

class Comments extends Component {
  state = {
    formData: {
      author: this.props.comment ? this.props.comment.author : " ",
      body: this.props.comment ? this.props.comment.body : " ",
      id: this.props.comment ? this.props.comment.id : null
    },
    isEditing: false
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
  handleEditComment = comment => {
    const { author, body, id } = comment;
    this.setState({
      formData: {
        author,
        body,
        id
      },
      isEditing: true
    });
    console.log(id, author, body);
  };

  handleCommentVote(id, vote) {
    this.props.voteForComment(id, vote);
  }

  onInputChange = (e, { name, value }) => {
    const formData = this.state.formData;
    formData[name] = value;
    this.setState({ formData });
  };

  onSubmit(e) {
    e.preventDefault();

    const { isEditing } = this.state;
    const timestamp = Date.now();

    if (isEditing === true) {
      const { author, body, id } = this.state.formData;
      this.props.editComment({ id, author, body, timestamp });
      this.setState({ formData: "" }); //reset form data
    } else {
      const { id } = this.props.match.params;
      this.props.createComment(this.state.formData, id);

      this.setState({ formData: "" }); //reset form data
      this.props.history.push(`/posts/${id}`);
    }
  }

  renderComments() {
    return this.props.comments.map((comment, i) => {
      return (
        <Comment key={i}>
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
              <Comment.Action
                as="a"
                onClick={() => this.handleEditComment(comment)}
              >
                Edit
              </Comment.Action>
              <Comment.Action
                as="a"
                onClick={() => this.deleteComments(comment.id)}
              >
                Delete
              </Comment.Action>
              <Comment.Action
                as="a"
                onClick={() => this.handleCommentVote(comment.id, "upVote")}
              >
                upVote
              </Comment.Action>
              <span>{comment.voteScore} </span>
              <span>
                {" "}
                <Comment.Action
                  as="a"
                  onClick={() => this.handleCommentVote(comment.id, "downVote")}
                >
                  downVote
                </Comment.Action>
              </span>
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
        <br />
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
            size="mini"
          />
        </Form>
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   // const comments = _.filter(state.comments, comment => !comment.deleted);
//   // return { comments };
//   return { comment: state.comments[ownProps.match.params.id] };
// }

export default connect(null, {
  fetchComments,
  deleteComment,
  voteForComment,
  createComment,
  editComment
})(Comments);
