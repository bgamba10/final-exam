import React, { Component } from "react";
import PropTypes from "prop-types";

import Post from "./Post";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderPosts() {
    return this.props.posts.map((p,i) =>
      <Post
        
        key={i}
        post={p}>
      </Post>
    );
  }
  render() {
    return (
      <div className="PostList">
        
        {this.renderPosts()}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
  
};
