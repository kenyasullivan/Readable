import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

//Wire component to action creators
import { connect } from "react-redux";
import { fetchPosts, fetchCategories } from "../actions";

class PostsList extends Component {
  //lifecycle method to initial call to API
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories()
  }

  //helper function to render posts: map over posts and render 1 <li> for each
  //Using and object so use lodash map _.map
  //use post.id as key
  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  renderCategories() {
		const {categories} = this.props;
		if (categories) {
			return categories.map(category => {
				return (
					<li key={category.path} className="list-group-item">
						<a href={'/' + category.name}>{category.name}</a>
					</li>
				);
			});
		}
	}
  render() {
    //console.log(this.props.posts) // test we are receiving posts from state
    return (   
    <div className="container">
    <div className="row">
    <div className="col-9">
        {/*Render Posts to the Page*/}
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
      <div className="col-3"> <h3>Category</h3>
    <ul className="list-group">
    {this.renderCategories()}
    </ul>
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
export default connect(mapStateToProps, { fetchPosts, fetchCategories })(PostsList);
