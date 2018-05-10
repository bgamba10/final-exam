import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3"; 


class Graph extends Component {
	constructor(props) {
		super(props);

	}



	componentDidMount(){
		console.log(this.props);

		

		const svg = d3.select(this.svg);
		this.width = +svg.attr("width");
		this.height = +svg.attr("height");

		this.format = d3.format(",d");

		this.color = d3.scaleOrdinal(d3.schemeCategory20c);

		this.pack = d3.pack()
		.size([this.width, this.height])
		.padding(1.5);


		this.update(this.props); 

	}

	componentWillUpdate(newProps){
		
		this.update(newProps);
	//	console.log("wilupdate"); 
}

getDistance(lat1,lon1,lat2,lon2) {
	function deg2rad(deg) {
		return deg * (Math.PI/180);
	}

	    var R = 6371; // Radius of the earth in km
	    var dLat = deg2rad(lat2-lat1);  // deg2rad below
	    var dLon = deg2rad(lon2-lon1);
	    var a =
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ;
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	    var d = R * c; // Distance in km
	    return d;
	}

	distanceCalc(nestedBuses){

		for (let route of nestedBuses ) {
			route.total = 0;
			route.values[0].distance = 0;
			for (let i = 1 ; i < route.values.length; i++) {
				route.values[i].distance = this.getDistance(+route.values[i-1].lat, +route.values[i-1].lon,
					+route.values[i].lat, +route.values[i].lon);
				route.total += route.values[i].distance;
			}
		}
		return nestedBuses.sort(function(a, b) { return b.total - a.total; });
	}

	update (props){


		console.log("Update", props); 
		console.log("State", this.svg); 

		
		if (!props.posts || props.posts.length === 0) return ; 

		const buses = props.posts;

		const nestedBuses = d3.nest().key((d) => d.routeTag).entries(buses);
		console.log(nestedBuses);

		const afterCalc = this.distanceCalc(nestedBuses);
		console.log(afterCalc);




	/*

			var root = d3.hierarchy({children: props.posts})
			.sum(function(d) { return d.cal; }) 
			.each(function(d) { 
				if (name = d.title) {
					var name, i = name.lastIndexOf(".");
					d.name = name;
					d.package = name.slice(0, i);
					d.class = name.slice(i + 1);
				}
			});

			var svg = d3.select(this.svg); 

			var node = svg.selectAll(".node")
			.data(this.pack(root).leaves())
			.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			node.append("circle")
			.attr("id", function(d) { return d.name; })
			.attr("r", function(d) { return 5; })
			.style("fill", (d) => { return this.color(d.package); });

			node.append("clipPath")
			.attr("id", function(d) { return "clip-" + d.name; })
			.append("use")
			.attr("xlink:href", function(d) { return "#" + d.name; });

			node.append("text")
			.attr("clip-path", function(d) { return "url(#clip-" + d.name + ")"; })
			.selectAll("tspan")
			.data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
			.enter().append("tspan")
			.attr("x", 0)
			.attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
			.text(function(d) { return d; });

			node.append("title")
			.text((d) => { return d.name + "\n" + this.format(d.cal); });

			*/

		}

		render() {
			return (
				<div> 
				<svg width="960" 
				height="400" 
				ref = {(svg) => this.svg = svg}>
				</svg>


				</div> 
				); 
		}
	}

	Graph.propTypes = {
		posts: PropTypes.array.isRequired
	};

	export default(Graph);