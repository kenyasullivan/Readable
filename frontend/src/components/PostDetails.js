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
      <div>
        <Link to="/">Back To Home</Link>

        <h3>{post.title}</h3>
        <h6>
          <span>Author:{post.author}</span>
        </h6>
        <p>{post.body}</p>
        <Link to={`/posts/edit/${post.id}`}>
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
        </Link>
        <button
          className="btn btn-danger pull-right"
          onClick={this.onDeleteSubmit.bind(this)}
        >
          Delete Post
        </button>
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
