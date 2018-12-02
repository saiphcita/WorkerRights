import React, { Component } from 'react';
import '../CSS/ContractG.css';

class ListContracts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        listColor: true
      }
    };
  
    render() {
      var listToReturn = this.props.data.map((val, ind) => {
        return(
          <div style={{border:"4px solid black", margin:"1.4% 0", paddingLeft:"1%"}} key={ind}>

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
              <ListadoX data={this.props.data[ind]} stage={true} />
            </div>
          </div>
        )
    })

    var buttonInv = <button className="buttonInv" onClick={()=> {this.setState({listColor: !this.state.listColor }) }}>Investigar Corrupción</button>


    if(this.state.listColor){

      buttonInv = <button className="buttonInv" onClick={()=> {this.setState({listColor: !this.state.listColor }) }}>Investigar Corrupción</button>

      listToReturn = this.props.data.map((val, ind) => {
          return(
            <div style={{border:"4px solid black", margin:"1.4% 0", paddingLeft:"1%"}} key={ind}>

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
                <ListadoX data={this.props.data[ind]} stage={true} />
              </div>
            </div>
          )
      })
    }else{

      buttonInv = <button className="buttonInv2" onClick={()=> {this.setState({listColor: !this.state.listColor }) }}>Ocultar Posible Corrupción</button>

      listToReturn = this.props.data.map((val, ind) => {
        if(val["COR"] === "1"){
          var toReturn = <div style={{border:"4px solid red", margin:"1.4% 0", paddingLeft:"1%"}} key={ind}>

          <div style={{textAlign:"left", marginBottom:"1%", marginTop:"0.2%"}}>
            <h3 style={{marginTop:"1.4%", color:"rgb(239, 219, 73)"}}>Nombre del Contrato {ind+1}:</h3>
            <p style={{color:"red"}}>{val["Nombre del Contrato:"]}</p>
          </div>

          <div style={{textAlign:"left", marginBottom:"2%"}}>
            <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Descripción:</h3>
            <p style={{color:"red"}}>{val["Describe el Contrato:"]}</p> 
          </div>

          <div style={{textAlign:"left", marginBottom:"2%"}}>
            <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Especificaciones:</h3>
            <ListadoX data={this.props.data[ind]} stage={false} />
          </div>
        </div>

        }else if(val["COR"] === "0"){
          toReturn = <div style={{border:"4px solid black", margin:"1.4% 0", paddingLeft:"1%"}} key={ind}>

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
            <ListadoX data={this.props.data[ind]} stage={true} />
          </div>
        </div>
        }
          return(toReturn)
      })
    }

      return (
        <div>
          <div style={{textAlign:"left", marginTop:"1.4%"}}>
            {buttonInv}
          </div>

          <div style={{width:"100%", height:"8.8%", color:"white", fontSize:"102%", textAlign:"left", marginTop:"1%"}}>
            Número de Contratos: {this.props.data.length}
          </div>

          {listToReturn}

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
        if(value !== "Nombre del Contrato:" && value !== "Describe el Contrato:" && value !== "Submitted At" && value !== "Token" && value !== "TIPO" && value !== "COR"){
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

      var page = <div className="DivComprasG">
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

      if(!this.props.stage){
        page = <div className="DivComprasG">
                  {arrayDJToUse.map((val, ind) =>{
                    return(
                      <div key={val["name"]}>
                      
                        <p>{val["name"]}</p>

                        <div>
                          {val["children"].map((value, indx) =>{
                            return (
                              <div key={indx} className="ClistG">
                                <li style={{width:"100%", maxWidth:"100%", textAlign:"left", fontSize:"80%", color:"red"}}>{value.toUpperCase()}</li>
                              </div>
                            )
                          })}
                        </div>

                      </div>
                    )
                  })}
                </div>
      }else{
        page = <div className="DivComprasG">
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
      }
      
      return (
        page
      );
    }
  }



export default ListContracts;