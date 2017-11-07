import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  Item,
  Container,
  Button,
  Comment,
  Header,
  Icon
} from "semantic-ui-react";
import {
  fetchPost,
  deletePost,
  editPost,
  fetchComments,
  createComment,
  voteForPost,
  voteForComment
} from "../actions";
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

  handleVote(id, vote) {
    this.props.voteForPost(id, vote);
  }
  submit(data, id) {
    this.createComment(data, id);
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
                  <Button color="red" size="mini">
                    Edit
                  </Button>
                </Link>
                <Button
                  color="blue"
                  size="mini"
                  onClick={this.onDeleteSubmit.bind(this)}
                >
                  Delete
                </Button>
                <Icon
                  name="thumbs outline up"
                  size="large"
                  onClick={() => this.handleVote(post.id, "upVote")}
                />
                <b>{post.voteScore}</b>{" "}
                <Icon
                  name="thumbs outline down"
                  size="large"
                  onClick={() => this.handleVote(post.id, "downVote")}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Container>
          <Comment.Group>
            <Header as="h3" dividing>
              Comments
            </Header>
            <Comments postId={post.id} {...this.props} />
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

function mapDispatchToProps(dispatch) {
  fetchPost;
}
export default connect(mapStateToProps, {
  fetchPost,
  deletePost,
  editPost,
  fetchComments,
  createComment,
  voteForPost,
  voteForComment
})(PostDetails);
