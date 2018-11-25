import React, { Component } from 'react';
import '../CSS/ListCompras.css';

class ListCompras extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataJ: this.props.data
      }
    };
  
    render() {
      return (
        <div className="DivCompras">
          {this.state.dataJ.map((val, ind) =>{
            return(
              <div key={val["name"]}>

                <p style={{color:"#80cbc4", fontSize:"1.4rem"}}>{val["name"]}</p>

                <div style={{border: "1px solid black"}}>
                  {val["children"].map((value, indx) =>{
                    return (
                      <div key={indx} className="Clist">
                        <li style={{width:"80%", maxWidth:"80%", textAlign:"left", paddingLeft:"8px", fontSize:"1rem"}}>{value.toUpperCase()}</li>
                        <li style={{width:"20%", maxWidth:"20%"}}> <input onChange={this.props.change} type="checkbox" name="compras" value={value}/> </li>
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      );
    }
  }


export default ListCompras;