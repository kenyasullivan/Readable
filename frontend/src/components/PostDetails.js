import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class PostDetails extends Component {
  componentDidMount(){
    const { id } = this.props.match.params //react router provides
    this.props.fetchPost(id);
  }
  render(){
    const { post } = this.props;
    if(!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>{post.title}</h3>
        <h6><span>Author:{post.author}</span></h6>
        <p>{post.body}</p>
      </div>
    )
  }
}

function mapStateToProps ({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] } //returns only the single post needed.
} 


export default connect(mapStateToProps, {fetchPost})(PostDetails);