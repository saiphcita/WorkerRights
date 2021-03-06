import React, { Component } from 'react';
import "../CSS/ContractG.css";
import "../CSS/LinksStyle.css";
import { Link } from 'react-router-dom'

const API = "https://sheets.googleapis.com/v4/spreadsheets/1Kbe7_iroQQRqX5GyW0v0a9fKsV7t5zGzDyijgK6rHew/values:batchGet?ranges=ContractTypeForm&majorDimension=ROWS&key=AIzaSyAl9W1l_Endo-wHPQKtS5p3EP0UA1YXCM0";

class ContractG extends Component {
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

       this.setState({ items: rows[rows.length - 1] });
   });

 }

  render() {

    window.onbeforeunload = function() {
      localStorage.removeItem("contratoH");
      return '';
    };

    return (
      <div className="containerG">
        <div className="linkGen">
          <img src="./image.png" alt="logo" />
          <Link to="/" onClick={()=> {window.location.reload();}} className="link1g">Crear Nuevo Anuncio de Contrato</Link>
          <Link to="/Contratos" className="link2g">Ver Anuncios de Contratos</Link>
          <Link to="/Graph" className="link2g">Visualizar Compras Públicas</Link>
        </div>
        <div style={{ minHeight:"100%", width:"100%", float:"left", backgroundColor:"inherit", textAlign:"center", fontSize:"160%"}}>
          <div style={{margin:"0 3.2% 2% 3.2%", minHeight:"100%"}}>

            <div style={{border:"4px solid black", margin:"2% 0", paddingLeft:"1%"}}>
              <h1 style={{marginTop:"2%"}}>Anuncio de Contrato Público </h1>

              <div style={{textAlign:"left", marginBottom:"1%"}}>
                <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Nombre del Contrato:</h3>
                <p>{this.state.items["Nombre del Contrato:"]}</p>
              </div>

              <div style={{textAlign:"left", marginBottom:"2%"}}>
                <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Descripción:</h3>
                <p>{this.state.items["Describe el Contrato:"]}</p> 
              </div>

              <div style={{textAlign:"left", marginBottom:"2%"}}>
                <h3 style={{marginBottom:"0", color:"rgb(239, 219, 73)"}}>Especificaciones:</h3>
                <ListadoX data={this.state.items} />
              </div>
            </div>  
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

export default ContractG;