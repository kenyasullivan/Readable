import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Button, Container, Grid, Icon } from "semantic-ui-react";
import Moment from "react-moment";

import { connect } from "react-redux";
import {
  fetchPosts,
  postsByCategory,
  deletePost,
  voteForPost,
  sortForPosts
} from "../actions";
import Nav from "./Nav";

class PostsList extends Component {
  componentDidMount() {
    if (this.props.match.params.category) {
      this.props.postsByCategory(this.props.match.params.category);
    } else {
      this.props.fetchPosts();
    }
  }

  handleVote(id, vote) {
    this.props.voteForPost(id, vote);
  }

  handlePostSort(method) {
    this.props.sortForPosts(method);
  }

  handleDelete(id, callback) {
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  renderPosts() {
    const { posts } = this.props;
    if (posts) {
      const sortPosts = _.sortBy(posts, this.props.sortBy).reverse();
      return sortPosts.map(post => (
        <div className="ui card" key={post.id}>
          <div className="content">
            <i
              className="right floated trash outline icon large red"
              onClick={() => this.handleDelete(post.id)}
            />
            <Link to={`/posts/edit/${post.id}`}>
              <i className="right floated edit icon large" />
            </Link>
            <div className="header">
              <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
            </div>
            <div className="card meta">
              Submited{" "}
              <Moment format="MM-DD-YYYY HH:mm">{post.timestamp}</Moment> by{" "}
              {post.author} in <b>{post.category}</b>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="comments outline icon blue" />
              <Link to={`/${post.category}/${post.id}`}>
                {post.commentCount} Comments
              </Link>
            </span>
            <span className="right floated star">
              <Icon
                name="thumbs outline up"
                size="large"
                color="blue"
                onClick={() => this.handleVote(post.id, "upVote")}
              />
              {""}
              <span>
                {" "}
                <b>{post.voteScore}</b>
              </span>
              {""}
              <Icon
                name="thumbs outline down"
                size="large"
                color="blue"
                onClick={() => this.handleVote(post.id, "downVote")}
              />
            </span>
          </div>
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="ui container">
        <Container>
          <Nav />
          <br />
        </Container>
        <Container>
          <Grid columns={2}>
            <Grid.Column>
              <Link to="/posts/new">
                {" "}
                <Button primary>Add Post</Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              {" "}
              <Button
                primary
                value="votescore"
                onClick={() => this.handlePostSort("voteScore")}
              >
                Sort By Popularity
              </Button>
              <Button
                primary
                value="timestamp"
                onClick={() => this.handlePostSort("timestamp")}
              >
                Sort By Date
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
        <div className="ui container">
          <div className="ui one column grid">
            <div className="twelve wide column">
              <h3>Posts</h3>
              <ul className="ui one cards">{this.renderPosts()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, sortBy }) {
  return {
    sortBy,
    posts: posts
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (id, callback) => dispatch(deletePost(id, callback)),
    voteForPost: (id, vote) => dispatch(voteForPost(id, vote)),
    sortForPosts: method => dispatch(sortForPosts(method)),
    postsByCategory: category => dispatch(postsByCategory(category))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
