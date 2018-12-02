import React, { Component } from 'react';
import "./CSS/ContractG.css";
import "./CSS/LinksStyle.css";
import { Link } from 'react-router-dom';
import Bubbles from './TOOLS/Bubbles.js';

const API = "https://sheets.googleapis.com/v4/spreadsheets/1Kbe7_iroQQRqX5GyW0v0a9fKsV7t5zGzDyijgK6rHew/values:batchGet?ranges=ContractTypeForm&majorDimension=ROWS&key=AIzaSyAl9W1l_Endo-wHPQKtS5p3EP0UA1YXCM0";

class Contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[]
    };
  }

  componentWillMount(){
    // SACANDO LO DATOS
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

      //ORDENDANDO LOS DATOS PARA LA GRAFICA
      var namesRows = []
      for(let i=0; i < rows.length; i++){
        namesRows.push(rows[i]["Nombre del Contrato:"])
      }
      namesRows = [...new Set(namesRows)]
      for(let i=0; i < namesRows.length; i++){
        namesRows[i] = {
          "Name": namesRows[i],
          "hijos": []
        }
      }
      for(let i=0; i < rows.length; i++){
        for(let j=0; j < namesRows.length; j++){
          if(rows[i]["Nombre del Contrato:"] === namesRows[j]["Name"]){
            namesRows[j]["hijos"].push(rows[i]);
            namesRows[j]["Count"] = (namesRows[j]["hijos"].length)*1200
          }
        }
      }

      this.setState({buuble:<Bubbles data={namesRows} />});
    });
 }

  render() {

    return (
      <div className="containerG">
        <div className="linkGen">
              <Link to="/" className="link1g">Crear Nuevo Anuncio de Contrato</Link>
              <Link to="/Contratos" onClick={()=>{ window.location.reload();}} className="link2g">Ver Anuncios de Contratos</Link>
              <Link to="/Graph" className="link2g">Visualizar Compras Públicas</Link>
        </div>
        <div style={{ minHeight:"100%", width:"100%", float:"left", backgroundColor:"inherit", textAlign:"center", fontSize:"160%"}}>
          <div style={{margin:"0 3.2% 2% 3.2%", minHeight:"100%"}}>
            
            <h1 style={{marginTop:"2%", marginBottom:"0"}}>Anuncios de Contratos Públicos </h1>

            {this.state.buuble}

          </div>
        </div>
      </div>
    );
  }
}

export default Contracts;