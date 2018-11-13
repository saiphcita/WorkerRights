import React, { Component } from 'react';
import '../CSS/RamoGraph.css'
import * as d3  from "d3";

class RamoGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  componentDidMount(){
    var arrayOfValues = [];
    for(let i=0; i<this.props.data.length; i++){
      arrayOfValues.push(this.props.data[i].value);
    };

    arrayOfValues = Math.ceil(Math.max(...arrayOfValues));
    var stringNumber = arrayOfValues.toString().slice(0,1)
    var addingNumber = 1 + parseInt(stringNumber)

    while(addingNumber.toString().length < arrayOfValues.toString().length){
      addingNumber*=10
    }

    var numberOfDomainY = addingNumber


    const svg = d3.select('#graphSub');
    const sample = this.props.data;


    const margin = 80;
    const clientWidth =  document.getElementById('containerSub').clientWidth;
    const width = clientWidth - 2 * 48;
    const height = 482 - 2 * 40;

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${18})`);

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.name))
      .padding(0.4)
    
    var yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, numberOfDomainY]);
    
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
      .on('click' , (g) => {localStorage.setItem("statePage", 2);  localStorage.setItem("subData", g.name); localStorage.setItem("showGraph", true); window.location.reload(); })
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
      .attr('y', (a) => yScale(a.value) - 10)
      .attr('text-anchor', 'middle')
      .text((a) => `$${a.value}`)
    

    if(this.props.miBi){
      svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2.8) - margin)
      .attr('y', margin / 2.8)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Millones de Pesos')
    }else{
      svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2.8) - margin)
      .attr('y', margin / 2.8)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Billones de Pesos')
    }

    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 0.8)
      .attr('text-anchor', 'middle')
      .text('Instituciones')
  }
    
    render() {
      return(
        <div>
            <div id='layoutSub'>
            <h2 style={{width:"1340px", margin:"0", padding:"4px 0", textAlign:"center", backgroundColor:"#2F4A6D", color:"white"}}>Gastos por Instituciones</h2>
                <div id='containerSub'>
                  <svg id="graphSub"/>
                </div>
            </div>
        </div>
      )
    }
}


export default RamoGraph;