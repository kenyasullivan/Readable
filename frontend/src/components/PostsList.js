import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { List, Button, Container, Grid } from "semantic-ui-react";

//Wire component to action creators
import { connect } from "react-redux";
import { fetchPosts, fetchCategories } from "../actions";

class PostsList extends Component {
  //lifecycle method to initial call to API
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  //helper function to render posts: map over posts and render 1 <li> for each
  //Using and object so use lodash map _.map
  //use post.id as key
  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <div className="ui card">
          <div className="content">
            <i className="right floated trash outline icon" />
            <Link to={`/posts/edit/${post.id}`}>
              <i className="right floated edit icon" />
            </Link>
            <div className="header">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated like">
              <i className="comments outline icon" />
              {post.commentCount} Comments
            </span>
            <span className="right floated star">
              <i className="chevron up icon" />
              {post.voteScore}
              <i className="chevron down icon" />
            </span>
          </div>
        </div>
      );
    });
  }

  renderCategories() {
    const { categories } = this.props;
    if (categories) {
      return categories.map(category => {
        return (
          <li key={category.path} className="list-group-item">
            <a href={`/${category.name}`}>{category.name}</a>
          </li>
        );
      });
    }
  }
  render() {
    //console.log(this.props.posts) // test we are receiving posts from state
    return (
      <div>
        <Container>
          <Grid floated right columns={4}>
            <Grid.Column>
              <Link to="/posts/new">
                {" "}
                <Button primary>Add Post</Button>
              </Link>
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
                <List.Item>
                  <List.Content>{this.renderCategories()} </List.Content>
                </List.Item>
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
function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories.categories
  };
}
//get action creator as prop
export default connect(mapStateToProps, { fetchPosts, fetchCategories })(
  PostsList
);
