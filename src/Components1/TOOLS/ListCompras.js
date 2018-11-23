import React, { Component } from 'react';
import '../CSS/ListCompras.css';

class ListCompras extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    };
  
    componentDidMount() {
      for(let i = 0; i < this.props.data.length; i++){
        console.log(this.props.data[i])
      }
    }
  
    render() {
      return (
          <div className="DivCompras">

            <div className="titleList">
              <li style={{width:"8%", maxWidth:"8%"}}>No.</li>
              <li style={{width:"78%", maxWidth:"78%", textAlign:"left", paddingLeft:"8px"}}>Compra</li>
              <li style={{width:"14%", maxWidth:"14%", textAlign:"left", paddingLeft:"8px"}}></li>
            </div>

            <div style={{border: "1px solid black"}}>
              {this.props.data.map((val, ind) =>{
                return (
                  <div key={ind} className="Clist">
                    <li style={{width:"8%", maxWidth:"8%"}}>{ind+1}</li>
                    <li style={{width:"78%", maxWidth:"78%", textAlign:"left", paddingLeft:"8px"}}>{val}</li>
                    <li style={{width:"14%", maxWidth:"14%"}}> <input type="checkbox" name="compras" value={val}/> </li>
                  </div>
                )
              })}
            </div>

          </div>
      );
    }
  }


export default ListCompras;