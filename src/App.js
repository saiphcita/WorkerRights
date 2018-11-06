import React, { Component } from 'react';
import Graph1 from "./Components/Graph1";
import Graph2 from "./Components/Graph2";
import Statistics from "./Components/Statistics";

class App extends Component {
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
    var button = <button onClick={()=>{ localStorage.setItem("statePage", 0); localStorage.setItem("jsonData", ""); window.location.reload();}}>return</button>
    var page = ""
    
    if(this.state.statePage === "0"){
      page = <div><Graph1/><Graph2/></div>
    }else if(this.state.statePage === "1"){
      page = <div>{button}<Statistics/></div>
    }

    return (
      <div>
        {page}
      </div>
    );
  }
}

export default App;
