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
        <textarea
          type="text"
          placeholder="Text"
          ref="text"/>
        <button className="my-btn-2"
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
