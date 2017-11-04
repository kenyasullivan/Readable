import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Item, Container, Button } from "semantic-ui-react";
import { fetchPost, deletePost, editPost } from "../actions";
import Comments from "./Comments";

class PostDetails extends Component {
  componentDidMount() {
    const { id } = this.props.match.params; //react router provides
    this.props.fetchPost(id);
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
                  Submited: {post.timestamp} By:{post.author} in {post.category}
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

        <Comments />
      </Container>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }; //returns only the single post needed.
}

export default connect(mapStateToProps, { fetchPost, deletePost, editPost })(
  PostDetails
);
