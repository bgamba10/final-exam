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
      <div className="PostAdd" id="bot" >
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
        ><a href="#extra">Add</a>
        </button>
      </div>
    );
  }
}

PostAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};
