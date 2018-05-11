import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import AccountsUIWrapper from './AccountsUIWrapper.js';

import PostList from "./PostList";
import PostAdd from "./PostAdd";
import Graph from "./Graph";
import { Posts } from "../api/posts";

import { Session } from 'meteor/session';
import "./default.css";
import "./fonts.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      agencyList:[],
      routesList:[],
      selectValue: ""
    };

  }

  componentDidMount(){

    this.fetchInfo();
    this.fetchRoutes();
    console.log(this.state.routesList);
  }

  fetchInfo() {


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


      })
      .catch((err) => {if(err.status === 404){window.alert("Could not retrieve buses.")}}  );

    } ,10000);

}

fetchRoutes() {


    let me = this;

  //fetch 
  fetch("http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni")
  .then((res) => {
    return res.json();
  })
  .then((info) => {

    var routes = [];
    routes = info.route;
    console.log(routes);

    me.setState({routesList: routes });

    
  })
  .catch((err) => {if(err.status === 404){window.alert("Could not retrieve routes.")}}  );

  
}

onAdd(text) {

    if (typeof text !== 'string')
    {
      window.alert ("Write only text please!"); 
      return; 
    }

    if (this.state.selectValue == "")
    {
      window.alert ("Select a route please!"); 
      return; 
    }

    if (Meteor.userId() === null) 
    {
      window.alert("You are not registered! Please sign in."); 
      return; 
    }
 

    Meteor.call('posts.insert', this.state.selectValue, text);

  }

renderRoutes(){

  return this.state.routesList.map((p,i) =>

    <option value={p.tag}> {p.tag}</option>
    );
}


handleChange(e){
    this.setState({selectValue:e.target.value});
    Session.set('route', e.target.value);
  }
//&#39;

hrefRoute(){


  let route = "https://www.sfmta.com/routes/";
  route = route + this.state.selectValue.toLowerCase();
  console.log(route);
  return route;
}

render() {
  return (
    <div className="App">
    <div id="banner2">
    <AccountsUIWrapper/>
    </div>
    <div id="banner">

      <div className="container">
        <div class="title">

          <h1>Muni Distance</h1>
          <span class="byline">Welcome to Muni Distance 
          where you can see a cool graph of the distance between 
          buses in the differente Muni routes in San Francisco!</span> </div>
        <ul class="actions">
          <li><a href="#page" class="button">Get Started</a></li>
        </ul>
      </div>
    </div>

    

    <div id="page" class="container">
      <div class="title">
        <h2>Distance Graph</h2>
        <span class="byline">Welcome to the distance graph, get to know the distance between the Munis in the same route.</span> </div>
      
        
    <Graph buses = {this.state.agencyList}></Graph>
    </div>


    
  

    <div id="featured">
      <div class="container">
       
        
      
      <div className= "row">
      <div className="col-sm-6">
      <h3>Feeling the urge to comment about a route?</h3>
      <h4>Select the one you&#39;re looking for</h4>
      <select id="route-selection" onChange={this.handleChange.bind(this)} >
      <option value="Select a route">Select a route</option>

      {this.state.routesList.map((p,i) =>  <option value={p.title}> {p.title}</option>)}
      </select>
      <PostAdd
      onAdd={this.onAdd.bind(this)}
      >
      </PostAdd>
      </div>
      <div className="col-sm-6">
      <h2>Do you want to check the route real time?</h2>
      <h3>Don&#39;t hesitate <a target="_blank" href={this.hrefRoute()}>CLICK HERE</a> and check the live map!</h3>
      </div>
      </div>
      </div>
    </div>


    <div id="extra" class="container">
    <div class="title">
      <h2>{this.state.selectValue}</h2>
    </div>
    <div className="row">
      
      <PostList posts={this.props.posts} route={this.state.selectValue}></PostList>
    </div>
    <ul class="actions">
      <li><a href="#" class="button">Back Top</a></li>
    </ul>
  </div>
      </div>
    
    );
}
}
App.propTypes = {
  posts: PropTypes.array.isRequired
};

export default withTracker(
  () => {
    return {
      posts: Posts.find({route: Session.get("route")}).fetch()
    };
  }
  )(App);










