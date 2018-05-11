import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PostAdd extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  clearContents(element) {
    this.refs.text.value = ''; 
  }

  render() {
    return (
      <div className="PostAdd">
        <div>
        <textarea
          id="texto"
          type="text"
          placeholder="Comment here!"
          ref="text"/>
          </div>
        <button className="button"
          onClick={
            () =>
              {
              this.props.onAdd(this.refs.text.value);
              this.clearContents(this);
              }
          }
        >Add
        </button>
      </div>
    );
  }
}

PostAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};
