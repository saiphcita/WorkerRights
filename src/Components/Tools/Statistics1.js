import React, { Component } from 'react';
import '../CSS/statistics1.css'
import * as d3  from "d3";

class Statistics1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ],
      titleStati: localStorage.getItem("jsonData")
    };
  }

  
  componentDidMount(){ 
    var margin = {top: 40, right: 0, bottom: 0, left: this.props.MarginLeftJson},
    width = 980,
    height = this.props.heightJson-80;

    var dollarFormat = function(d) { return "$"+d3.format(',')(d) };

    var x = d3.scaleLinear()
        .range([0, width]);

    x.tickFormat(dollarFormat)

    var barHeight = 28;

    var color = d3.scaleOrdinal()
        .range(["#80cbc4", "#ccc"]);

    var duration = 750,
        delay = 32;

    var partition = d3.partition();


    var xAxis = d3.axisTop()
        .scale(x);

    xAxis.tickFormat(dollarFormat)

    var svg = d3.select("#stati1")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", up);

    svg.append("g")
        .attr("class", "x axis");

    svg.append("g")
        .attr("class", "y axis")
      .append("line")
        .attr("y1", "100%");

      var root = d3.hierarchy(this.props.jsonData)
                    .sum(d => d.size)
                    .sort((a,b) => b.value - a.value);

      partition(root);
      
      x.domain([0, root.value]).nice();
      down(root, 0);

      x.tickFormat(dollarFormat)
      

    function down(d, i) {
      if (!d.children ) return;
      var end = duration + d.children.length * delay;

      // Mark any currently-displayed bars as exiting.
      var exit = svg.selectAll(".enter")
          .attr("class", "exit");

      // Entering nodes immediately obscure the clicked-on bar, so hide it.
      exit.selectAll("rect").filter(function(p) { return p === d; })
          .style("fill-opacity", 1e-6);

      // Enter the new bars for the clicked-on data.
      // Per above, entering bars are immediately visible.
      var enter = bar(d)
          .attr("transform", stack(i))
          .style("opacity", 1);

      // Have the text fade-in, even though the bars are visible.
      // Color the bars as parents; they will fade to children if appropriate.
      enter.select("text").style("fill-opacity", 1e-6);
      enter.select("rect").style("fill", color(true));

      // Update the x-scale domain.
      x.domain([0, d3.max(d.children, function(d) { return d.value; })]).nice()

      // Update the x-axis.
      svg.selectAll(".x.axis").transition()
          .duration(duration)
          .call(xAxis)

        var dollarFormat = function(d) { return "$"+d3.format(',')(d) };
        xAxis.tickFormat(dollarFormat)

      // Transition entering bars to their new position.
      var enterTransition = enter.transition()
          .duration(duration)
          .delay(function(d, i) { return i * delay; })
          .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.4 + ")"; });

      // Transition entering text.
      enterTransition.select("text")
          .style("fill-opacity", 1);

      // Transition entering rects to the new x-scale.
      enterTransition.select("rect")
          .attr("width", function(d) { return x(d.value); })
          .style("fill", function(d) { return color(!!d.children); });

      // Transition exiting bars to fade out.
      var exitTransition = exit.transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .remove();

      // Transition exiting bars to the new x-scale.
      exitTransition.selectAll("rect")
          .attr("width", function(d) { return x(d.value); });

      // Rebind the current node to the background.
      svg.select(".background")
          .datum(d)
        .transition()
          .duration(end);

      d.index = i;
    }

    function up(d) {
      if (!d.parent || this.__transition__) return;
      var end = duration + d.children.length * delay;

      // Mark any currently-displayed bars as exiting.
      var exit = svg.selectAll(".enter")
          .attr("class", "exit");

      // Enter the new bars for the clicked-on data's parent.
      var enter = bar(d.parent)
          .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.4 + ")"; })
          .style("opacity", 1e-6);

      // Color the bars as appropriate.
      // Exiting nodes will obscure the parent bar, so hide it.
      enter.select("rect")
          .style("fill", function(d) { return color(!!d.children); })
        .filter(function(p) { return p === d; })
          .style("fill-opacity", 1e-6);

      // Update the x-scale domain.
      x.domain([0, d3.max(d.parent.children, function(d) { return d.value; })]).nice();

      // Update the x-axis.
      svg.selectAll(".x.axis").transition()
          .duration(duration)
          .call(xAxis);

      // Transition entering bars to fade in over the full duration.
      var enterTransition = enter.transition()
          .duration(end)
          .style("opacity", 1);

      // Transition entering rects to the new x-scale.
      // When the entering parent rect is done, make it visible!
      enterTransition.select("rect")
          .attr("width", function(d) { return x(d.value); })
          .on("end",function(p) { if (p === d) d3.select(this).style("fill-opacity", null); });

      // Transition exiting bars to the parent's position.
      var exitTransition = exit.selectAll("g").transition()
          .duration(duration)
          .delay(function(d, i) { return i * delay; })
          .attr("transform", stack(d.index));

      // Transition exiting text to fade out.
      exitTransition.select("text")
          .style("fill-opacity", 1e-6);

      // Transition exiting rects to the new scale and fade to parent color.
      exitTransition.select("rect")
          .attr("width", function(d) { return x(d.value); })
          .style("fill", color(true));

      // Remove exiting nodes when the last child has finished transitioning.
      exit.transition()
          .duration(end)
          .remove();

      // Rebind the current parent to the background.
      svg.select(".background")
          .datum(d.parent)
        .transition()
          .duration(end);
    }

    // Creates a set of bars for the given data node, at the specified index.
    function bar(d) {
      var bar = svg.insert("g", ".y.axis")
          .attr("class", "enter")
          .attr("transform", "translate(0,5)")
        .selectAll("g")
          .data(d.children)
        .enter().append("g")
          .style("cursor", function(d) { return !d.children ? null : "pointer"; })
          .on("click", down);

      bar.append("text")
          .attr("x", -12)
          .attr("y", barHeight / 2)
          .attr("dy", ".2em")
          .style("text-anchor", "end")
          .style("font-size", "0.7rem")
          .text(function(d) { return d.data.name; });

      bar.append("text")
            .attr("class", "subtitle")
            .attr("x", -12)
            .attr("y", barHeight)
            .style("text-anchor", "end")
            .style("fill","#999")
            .style("font-size", "0.6rem")
            .attr("dy", ".2em")
            .text(function(d) { return d.data.subtitle; });

        bar.append("text")
            .attr("class", "subtitle")
            .attr("x", -68)
            .attr("y", barHeight/2)
            .style("text-anchor", "end")
            .style("fill","black")
            .style("font-size", "0.65rem")
            .attr("dy", ".2em")
            .text(function(d) { return d.data.ramo; });

      bar.append("rect")
          .attr("width", function(d) { return x(d.value); })
          .attr("height", barHeight);

      return bar;
    }

    // A stateful closure for stacking bars horizontally.
    function stack(i) {
      var x0 = 0;
      return function(d) {
        var tx = "translate(" + x0 + "," + barHeight * i * 1.2 + ")";
        x0 += x(d.value);
        return tx;
      };
    }
  }

    
    render() {
      return(
        <div>
            <div id='containerStatis1'>
                <svg id="stati1"/>
            </div>
        </div>
      )
    }
}


export default Statistics1;