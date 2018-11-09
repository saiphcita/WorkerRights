import React, { Component } from 'react';
import '../CSS/graph2.css'
import * as d3  from "d3";

var  programas = require('../Data/Programas.json');
var jsonData = []
for (let i=0; i < programas.length; i++){
  if(programas[i].millones){
      jsonData.push(programas[i])
  }
}

class Graph2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [ ]
    };
  }

  
  componentDidMount(){
    const svg = d3.select('#graph2');
    
    const margin = 80;

    const clientWidth =  document.getElementById('container2').clientWidth;
    const width = clientWidth - 2 * 48;
    
    const height = 620 - 2 * margin;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

      
    const sample = jsonData;

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.name))
      .padding(0.4)
    
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 1000]);

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
      .on('click' , (g) => { localStorage.setItem("statePage", 1); localStorage.setItem("jsonData", g.name); window.location.reload(); })
      .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.5)
          .attr('x', (a) => xScale(a.name) - 8)
          .attr('width', xScale.bandwidth() + 20)
          .style("cursor", "pointer")

        barGroups.append('text')
          .attr('class', 'text')
          .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) - 10)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a) => `$${a.value}`)

      })
      .on('mouseleave', function () {
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.name))
          .attr('width', xScale.bandwidth())
          .style("cursor", "default")

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
      })

    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.name) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + -10)
      .attr('text-anchor', 'middle')
      .text((a) => `$${a.value}`)
    
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Montos en Millones de Pesos')

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Programa')

    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Gastos Federales Secundarios')

  }
    
    render() {
      return(
        <div>
            <div id='layout2'>
                <div id='container2'>
                  <svg id="graph2"/>
                </div>
            </div>
        </div>
      )
    }
}


export default Graph2;