import React, { Component } from 'react';
import Graph1 from "./Tools/Graph1";
import Graph2 from "./Tools/Graph2";
import Interface2 from "./Interface2";

class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount(){
    this.setState({statePage: localStorage.getItem("statePage")});
    this.setState({jsonData: localStorage.getItem("jsonData")});
};

  render() {
    var button = <div style={{width:"1340px", height:"45px", backgroundColor:"black"}}>
                    <button
                      style={{width:"325px", height:"100%", color:"black", backgroundColor:"#80cbc4", float:"right", border:"none", cursor:"pointer", padding:"0"}}
                      onClick={()=>{ localStorage.setItem("statePage", 0); localStorage.setItem("jsonData", ""); window.location.reload();}}>Volver</button>
                  </div>

    var page = <div><Graph1/><Graph2/></div>
    
    if(this.state.statePage === "0"){
      page = <div><Graph1/><Graph2/></div>
    }else if(this.state.statePage === "1"){
      page = <div>{button}<Interface2/></div>
    }

    return (
      <div>
        {page}
      </div>
    );
  }
}

export default Interface;
