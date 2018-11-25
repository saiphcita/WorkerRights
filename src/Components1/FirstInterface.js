import React, { Component } from 'react';

import CreateContract from "./TOOLS/CreateContract.js";
import ContractG from "./TOOLS/ContractG.js";

class FirstInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    var page = <CreateContract/>

    if(localStorage.getItem("contratoH") === "true"){
      page = <ContractG/>
    }else{
      page = <CreateContract/>
    }

    return (
      page
    );
  }
}

export default FirstInterface;
