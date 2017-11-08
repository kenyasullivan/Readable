import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { List, Button, Container, Grid, Icon } from "semantic-ui-react";
import Moment from "react-moment";

import { connect } from "react-redux";
import {
  fetchPosts,
  fetchCategories,
  postsByCategory,
  deletePostList,
  voteForPost,
  sortForPosts
} from "../actions";

import { sortByScore, sortByDate } from "../utils/filters";

class PostsList extends Component {
  //lifecycle method to initial call to API
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

  renderPosts() {
    const { categories, posts } = this.props;

    if (posts) {
      const sortPosts = _.sortBy(posts, this.props.sortBy).reverse();
      return sortPosts.map(post => (
        <div className="ui card" key={post.id}>
          <div className="content">
            <i
              className="right floated trash outline icon"
              onClick={() => this.props.deletePostList(post.id)}
            />
            <Link to={`/posts/edit/${post.id}`}>
              <i className="right floated edit icon" />
            </Link>
            <div className="header">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
            <div className="card meta">
              Submited{" "}
              <Moment format="MM-DD-YYYY HH:mm">{post.timestamp}</Moment> by{" "}
              {post.author} in {post.category}
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="comments outline icon" />
              {post.commentCount} Comments
            </span>
            <span className="right floated star">
              <Icon
                name="thumbs outline up"
                size="large"
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
                onClick={() => this.handleVote(post.id, "downVote")}
              />
            </span>
          </div>
        </div>
      ));
    }
  }

  renderCategories() {
    const { categories } = this.props;
    if (categories) {
      return categories.map(category => {
        return (
          <List.Item key={category.path}>
            <Link to={`/${category.name}`}>{category.name}</Link>
          </List.Item>
        );
      });
    }
  }
  render() {
    //console.log(this.props.posts) // test we are receiving posts from state
    const { sortForPosts } = this.props;
    return (
      <div>
        <Container>
          <Grid columns={4}>
            <Grid.Column>
              <Link to="/posts/new">
                {" "}
                <Button primary>Add Post</Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              {" "}
              <Button
                value="votescore"
                onClick={() => this.handlePostSort("voteScore")}
              >
                Sort By Popularity
              </Button>
              <Button
                value="timestamp"
                onClick={() => this.handlePostSort("timestamp")}
              >
                Sort By Date
              </Button>
            </Grid.Column>
          </Grid>
        </Container>
        <div className="ui container">
          <div className="ui two column grid">
            <div className="twelve wide column">
              {/*Render Posts to the Page*/}
              <h3>Posts</h3>
              <ul className="ui one cards">{this.renderPosts()}</ul>
            </div>
            <div className="four wide column">
              {" "}
              <h3>Category</h3>
              <List divided relaxed size={"big"}>
                <List.Content>{this.renderCategories()} </List.Content>
              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//To consume from Application State use
//return our list of posts for state
function mapStateToProps({ posts, category, sortBy, categories }, ownProps) {
  const filterPost = _.filter(
    posts,
    post => post.category === ownProps.match.params.category
  );
  return {
    sortBy,
    posts: posts,
    categories: categories.categories,
    categoryName: ownProps.match.params.category
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePostList: id => dispatch(deletePostList(id)),
    voteForPost: (id, vote) => dispatch(voteForPost(id, vote)),
    fetchCategories: () => dispatch(fetchCategories()),
    sortForPosts: method => dispatch(sortForPosts(method)),
    postsByCategory: category => dispatch(postsByCategory(category))
  };
}

//get action creator as prop
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
