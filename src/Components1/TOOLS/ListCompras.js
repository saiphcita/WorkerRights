import React, { Component } from 'react';
import '../CSS/ListCompras.css';

class ListCompras extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    };
  
    // componentDidMount() {
    //   for(let i = 0; i < this.props.data.length; i++){
    //     console.log(this.props.data[i])
    //   }
    // }
  
    render() {
      return (
        <div className="DivCompras">
          {this.props.data.map((val, ind) =>{
            return(
              <div>

                <p style={{marginBottom:"0px", color:"#80cbc4", fontSize:"1.2rem"}}>{val["name"]}</p>

                <div className="titleList">
                  <li style={{width:"8%", maxWidth:"8%"}}>No.</li>
                  <li style={{width:"78%", maxWidth:"78%", textAlign:"left", paddingLeft:"8px"}}>Compra</li>
                  <li style={{width:"14%", maxWidth:"14%", textAlign:"left", paddingLeft:"8px"}}></li>
                </div>

                <div style={{border: "1px solid black"}}>
                  {val["children"].map((value, indx) =>{
                    return (
                      <div key={indx} className="Clist">
                        <li style={{width:"8%", maxWidth:"8%"}}>{indx+1}</li>
                        <li style={{width:"78%", maxWidth:"78%", textAlign:"left", paddingLeft:"8px"}}>{value}</li>
                        <li style={{width:"14%", maxWidth:"14%"}}> <input type="checkbox" name="compras" value={value}/> </li>
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