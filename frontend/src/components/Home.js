import React, { Component } from "react";
import PostsList from "./PostsList";
import Categories from "./Categories";

class PostsMain extends Component {
  render() {
    return (
      <div>
        <div>
          <PostsList />
        </div>
        <div className="col-4">
          <Categories />
        </div>
      </div>
    );
  }
}

export default PostsMain;
