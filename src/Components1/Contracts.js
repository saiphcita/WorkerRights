import React, { Component } from 'react';
// import "./CSS/Contracts.css";
import { Link } from 'react-router-dom'

const API = "https://sheets.googleapis.com/v4/spreadsheets/1Kbe7_iroQQRqX5GyW0v0a9fKsV7t5zGzDyijgK6rHew/values:batchGet?ranges=ContractTypeForm&majorDimension=ROWS&key=AIzaSyAl9W1l_Endo-wHPQKtS5p3EP0UA1YXCM0";

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[]
    };
  }

  componentDidMount(){
    fetch(API).then(response => response.json()).then(data => {
     let batchRowValues = data.valueRanges[0].values;

     const rows = [];
     for (let i = 1; i < batchRowValues.length; i++) {
       let rowObject = {};
       for (let j = 0; j < batchRowValues[i].length; j++) {
         rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
       }
       rows.push(rowObject);
     }

       this.setState({ items: rows});
   });

 }

  render() {

    return (
      <div className="containerG">
        <div style={{ minHeight:"100%", width:"100%", float:"left", backgroundColor:"inherit", textAlign:"center"}}>
          <div style={{margin:"0 3.2% 2% 3.2%", minHeight:"100%"}}>

          <Link to="/Graph" className="linkGG">Ir a las Gráficas</Link>

          <h1 style={{marginTop:"2%"}}>Anuncios de Contratos Públicos </h1>

          {this.state.items.map((val, ind) => {
              return(
                <div style={{border:"4px solid black", margin:"3.2% 0", paddingLeft:"1%"}} key={ind}>

                <div style={{textAlign:"left", marginBottom:"1%"}}>
                  <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Nombre del Contrato:</h3>
                  <p>{val["Nombre del Contrato:"]}</p>
                </div>
  
                <div style={{textAlign:"left", marginBottom:"2%"}}>
                  <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Descripción:</h3>
                  <p>{val["Describe el Contrato:"]}</p> 
                </div>
  
                <div style={{textAlign:"left", marginBottom:"2%"}}>
                  <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Especificaciones:</h3>
                  <ListadoX data={this.state.items[ind]} />
                </div>
              </div> 
              )
          })}

            <button className="buttonContractG" onClick={()=>{ localStorage.setItem("contratoH", false); window.open('/', '_self'); }}>Crear Nuevo Contrato</button>

          </div>
        </div>
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
        if(value !== "Nombre del Contrato:" && value !== "Describe el Contrato:" && value !== "Submitted At" && value !== "Token"){
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


export default Contracts;