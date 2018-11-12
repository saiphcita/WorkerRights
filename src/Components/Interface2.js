import React, { Component } from 'react';
import SubGraph from "./Tools/SubGraph.js"

class Interface2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [ ],
          titleStati: localStorage.getItem("jsonData")
        };
      }

    render() {
      return(
        <div>
            <h1 style={{width:"1340px", margin:"0px", padding:"20px 0", textAlign:"center", backgroundColor:"#2F4A6D", color:"white"}} >{this.state.titleStati}</h1>
            <SubGraph data={this.props.jsonSubGraph} miBi={this.props.miBi}/>
        </div>
      )
    }
}


export default Interface2;