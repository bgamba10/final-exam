import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";


import PostList from "./PostList";
import PostAdd from "./PostAdd";
import Graph from "./Graph";
import { Posts } from "../api/posts";


export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      agencyList:[]
    };

    this.handleSubmit= this.handleSubmit.bind(this);

  }


  handleSubmit(event) {

    console.log("click");
    let me = this;

  //fetch 
    fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=0")
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      
      
      var buses = [];
      buses = info.vehicle;
      
      me.setState({agencyList: buses });

      for(let i of info.agency){
        console.log(i.id);
      }
    })
    .catch((err) => {if(err.status === 404){window.alert("No se puedieron recuperar los buses.")}}  );

  }

  render() {
    return (
      <div className="App">
        <h1>Final Exam</h1>

        
        <button onClick={this.handleSubmit.bind(this)}>Refresh</button>
        <Graph posts = {this.state.agencyList}></Graph>
      </div>
    );
  }
}


export default withTracker(
  () => {
    return {
      
    };
  }
)(App);









