import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state={

    };

  }


  render() {
    return (
      <div className="Post">
        <div>{this.props.post.who.profile.name}</div>
        <div>{this.props.post.text}</div>
        
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};
