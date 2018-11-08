import React, { Component } from 'react';
import '../CSS/subGraph.css'
import * as d3  from "d3";

class SubGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  componentDidMount(){
    const svg = d3.select('#graphSub');

    const margin = 80;

    const clientWidth =  document.getElementById('containerSub').clientWidth;
    const width = clientWidth - 2 * 48;
    
    const height = 420 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

      
    const sample = this.props.jsonData;

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.name))
      .padding(0.4)
    
    if(this.props.miBi){
      var yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 1000]);
    }else{
      yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 500]);
    }
    
    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale));

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

    const barGroups = chart.selectAll()
      .data(sample)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.name))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) - 10)
      .attr('text-anchor', 'middle')
      .text((a) => `$${a.value}`)
    

    if(this.props.miBi){
      svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Millones de Pesos')
    }else{
      svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Billones de Pesos')
    }

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Instituciones')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Gastos por Instituciones')

  }
    
    render() {
      return(
        <div>
            <div id='layoutSub'>
                <div id='containerSub'>
                  <svg id="graphSub"/>
                </div>
            </div>
        </div>
      )
    }
}


export default SubGraph;