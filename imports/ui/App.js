import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from './AccountsUIWrapper.js';

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

  }

  componentDidMount(){

    this.fetchInfo();
  }

  fetchInfo() {

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
  .catch((err) => {if(err.status === 404){window.alert("Could not retrieve buses.")}}  );

  Meteor.setInterval(() => {

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
      .catch((err) => {if(err.status === 404){window.alert("Could not retrieve buses.")}}  );

    } ,10000);

}

render() {
  return (
    <div className="App">
    <h1>Final Exam</h1>


    <AccountsUIWrapper/>
    <Graph buses = {this.state.agencyList}></Graph>
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









