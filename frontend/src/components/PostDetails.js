import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Item, Container, Button, Comment, Header } from "semantic-ui-react";
import { fetchPost, deletePost, editPost, fetchComments } from "../actions";
import Comments from "./Comments";

class PostDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params; //react router provides
    this.props.fetchPost(id);
    this.props.fetchComments(id);
  }

  onDeleteSubmit() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  onEditSubmit() {
    const { id } = this.props.match.params;
    this.props.editPost(id, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <Container>
        <Link to="/">Back To Home</Link>
        <Item.Group divided>
          <Item>
            <Item.Content>
              <Item.Header as="a">{post.title}</Item.Header>
              <Item.Meta>
                <span className="cinema">
                  Submited:{" "}
                  <Moment format="MM-DD-YYYY HH:mm">
                    {post.timestamp}
                  </Moment>{" "}
                  By:{post.author} in {post.category}
                </span>
              </Item.Meta>
              <Container>
                <Item.Description>{post.body}</Item.Description>
              </Container>
              <Item.Extra>
                <Link to={`/posts/edit/${post.id}`}>
                  <Button color="red">Edit</Button>
                </Link>
                <Button color="blue" onClick={this.onDeleteSubmit.bind(this)}>
                  Delete
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Container>
          <Comment.Group>
            <Header as="h3" dividing>
              Comments
            </Header>
            <Comments postId={post.id} />
          </Comment.Group>
        </Container>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const comments = _.filter(state.comments, comment => !comment.deleted);
  return {
    post: state.posts[ownProps.match.params.id],
    comments
  };
}

export default connect(mapStateToProps, {
  fetchPost,
  deletePost,
  editPost,
  fetchComments
})(PostDetails);
