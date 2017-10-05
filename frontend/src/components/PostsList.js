import React, {Component} from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

//Wire component to action creators
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsList extends Component {
   //lifecycle method to initial call to API
   componentDidMount(){
       this.props.fetchPosts();
   }

   //helper function to render posts: map over posts and render 1 <li> for each
   //Using and object so use lodash map _.map
   //use post.id as key
   renderPosts() {
    return _.map(this.props.posts, post => {
        return (
            <li 
            key={post.id} 
            className="list-group-item">
            {post.title}
            </li>
        )
    })
   }
    render() {
        //console.log(this.props.posts) // test we are receiving posts from state
        return (
        <div>
        {/*Button with Navigation*/}
          <div className="text-center">
            <Link className="btn btn-outline-primary" to="/posts/new">
            Add a Post
            </Link>
          </div>
          {/*Render Posts to the Page*/}
            <h3>Posts</h3>
            <ul className="list-group">
            {this.renderPosts()}
            </ul>
        </div>
        )
    }
}

//To consume from Application State use 
//return our list of posts for state
function mapStateToProps(state) {
    return { posts: state.posts }
}
//get action creator as prop
export default connect(mapStateToProps, { fetchPosts })(PostsList)