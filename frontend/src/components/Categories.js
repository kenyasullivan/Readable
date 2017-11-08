import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import PostsList from "./PostsList";

class Categories extends Component {
  render() {
    //console.log(this.props);
    const { categories, posts, categoryName } = this.props;
    const { category } = this.props.match.params;
    const filteredPost = _.filter(
      posts,
      post => post.category === categoryName
    );
    console.log(filteredPost);
    // const categoryPosts = posts.filter(data => data.category === category);
    return (
      <div>
        <div>
          <PostsList posts={filteredPost} comments={this.props.comments} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ category, posts, comments }, ownProps) {
  const filterPost = _.filter(
    posts,
    post => post.category === ownProps.match.params.category
  );
  // const filteredPosts = category
  //   ? filter(posts, { category: category.active })
  //   : values(posts);
  return {
    posts: posts,
    comments: comments,
    categoryName: ownProps.match.params.category
  };
}

export default connect(mapStateToProps)(Categories);
