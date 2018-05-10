import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderVotes() {
    let res=[];
    for (let emoji in this.props.post.votes) {
      res.push(
        <button
          onClick={() =>
            this.props.onVote(
              this.props.post,
              emoji
            )}
          key={emoji}>{emoji} {this.props.post.votes[emoji]}</button>
      );
    }
    return res;
  }


  render() {
    return (
      <div className="Post">
        <div>{this.props.post.text}</div>
        {this.renderVotes()}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};
