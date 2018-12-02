import React, { Component } from 'react';
import '../CSS/ContractG.css';

class ListContracts extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    };
  
    render() {
      return (
        <div>
          <div style={{width:"100%", height:"8.8%", color:"white", fontSize:"102%", textAlign:"left", marginTop:"1.4%"}}>
            Número de Contratos: {this.props.data.length}
          </div>
          {this.props.data.map((val, ind) => {
              return(
                <div style={{border:"4px solid black", margin:"1.4% 0", paddingLeft:"1%"}} key={ind}>

                {/* <h3 style={{margin:"1% 1% 0 0", color:"white", textAlign:"right"}}><span style={{border:"2px solid black"}}>{ind+1}</span></h3> */}

                <div style={{textAlign:"left", marginBottom:"1%", marginTop:"0.2%"}}>
                  <h3 style={{marginTop:"1.4%", color:"rgb(239, 219, 73)"}}>Nombre del Contrato {ind+1}:</h3>
                  <p>{val["Nombre del Contrato:"]}</p>
                </div>
  
                <div style={{textAlign:"left", marginBottom:"2%"}}>
                  <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Descripción:</h3>
                  <p>{val["Describe el Contrato:"]}</p> 
                </div>
  
                <div style={{textAlign:"left", marginBottom:"2%"}}>
                  <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Especificaciones:</h3>
                  <ListadoX data={this.props.data[ind]} />
                </div>
              </div> 
              )
          })}
        </div>
      );
    }
  }




  class ListadoX extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    };
  
    render() {
      var arrayDJToUse = []
      for(let value in this.props.data){
        if(value !== "Nombre del Contrato:" && value !== "Describe el Contrato:" && value !== "Submitted At" && value !== "Token" && value !== "TIPO"){
          if(this.props.data[value] !== ""){
            arrayDJToUse.push({
              "name": value,
              "children": this.props.data[value]
            })
          }
        }
      }
  
      for(let i=0; i < arrayDJToUse.length; i++){
        arrayDJToUse[i]["children"] = arrayDJToUse[i]["children"].split(',')
      }
      
      return (
        <div className="DivComprasG">
          {arrayDJToUse.map((val, ind) =>{
            return(
              <div key={val["name"]}>
              
                <p>{val["name"]}</p>
  
                <div>
                  {val["children"].map((value, indx) =>{
                    return (
                      <div key={indx} className="ClistG">
                        <li style={{width:"100%", maxWidth:"100%", textAlign:"left", fontSize:"80%"}}>{value.toUpperCase()}</li>
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



export default ListContracts;