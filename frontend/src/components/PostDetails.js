import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost, editPost } from "../actions";

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
      <div className="ui container">
        <Link to="/">Back To Home</Link>
        <div className="content">
        <i className="right floated trash outline icon" />
        <Link to={`/posts/edit/${post.id}`}>
          <i className="right floated edit icon" />
        </Link>
        <div className="header">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </div>
        <div className="description">
          <p>{post.body}</p>
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }; //returns only the single post needed.
}

export default connect(mapStateToProps, { fetchPost, deletePost, editPost })(
  PostDetails
);
