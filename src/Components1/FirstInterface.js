import React, { Component } from 'react';

// import CreateContract from "./TOOLS/CreateContract.js";
import ContractG from "./TOOLS/ContractG.js";
import Form from "./TOOLS/TypeForm.js";


class FirstInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    var page = <Form/>

    if(localStorage.getItem("contratoH") === "true"){
      page = <ContractG/>
    }else{
      page = <Form/>
    }

    return (
      page
    );
  }
}

export default FirstInterface;
