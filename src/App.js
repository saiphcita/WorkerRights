import React, { Component } from 'react';
import Graph1 from "./Components/Graph1";
import Graph2 from "./Components/Graph2";
import Statistics from "./Components/Statistics";

class App extends Component {
  render() {
    return (
      <div>
        <Graph1/>
        <Graph2/>

        <Statistics/>
      </div>
    );
  }
}

export default App;
