import React, { Component } from 'react';
import "../CSS/ContractG.css";
import * as d3 from "d3v4";
import ListContracts from "./ListContracts.js"

class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: true
    };
  }

  componentDidMount(){
    var dataset = {
      "children": this.props.data
    };

    //D3
    var diameter = 800;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var bubble = d3.pack()
    .size([diameter, diameter])
    .padding(1.5);

    var svg = d3.select("#circlesData")
    .append("svg")
    .style("width", diameter)
    .style("height", diameter)
    .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

    var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    node.append("title")
    .text(function(d) {
        return d.data.Name + ": " + d.data.Count;
    });

    node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("cursor", "pointer")
    .on("click", d => { this.setState({stage: false, dataL: d.data.hijos}) })
    .style("fill", function(d,i) {
        return color(i);
    });

    node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/4.6;
    })
    .attr("fill", "white");

    // node.append("text")
    // .attr("dy", "1.3em")
    // .style("text-anchor", "middle")
    // .text(function(d) {
    //     return d.data.Count/1000;
    // })
    // .attr("font-family",  "Gill Sans", "Gill Sans MT")
    // .attr("font-size", function(d){
    //     return d.r/5;
    // })
    // .attr("fill", "white");

    d3.select(this.frameElement)
    .style("height", diameter + "px");
  }


  render() {
    var container = <div style={{marginTop:"2%", marginBottom:"2%"}} id="circlesData" />
    if(this.state.stage){
      container = <div style={{marginTop:"2%", marginBottom:"2%"}} id="circlesData" />
    }else{
      container = <ListContracts data={this.state.dataL} returnF={()=>{window.location.reload(); }}/>
    }
    return (
      container
    );
  }
}


export default Bubbles;