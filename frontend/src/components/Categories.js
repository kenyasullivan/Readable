import React, { Component } from "react";
import { connect } from "react-redux";
import PostsList from "./PostsList";

class Categories extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Posts</h2>
          <h2>{this.props.categoryName}</h2>
          <PostsList posts={this.props.posts} comments={this.props.comments} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ post, comment }, ownProps) {
  return {
    posts: post.filter(post => post.category === ownProps.categoryName),
    comments: comment,
    categoryName: ownProps.categoryName
  };
}

export default connect(mapStateToProps)(Categories);
