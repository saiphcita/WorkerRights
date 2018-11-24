import React, { Component } from 'react';
import "./CSS/FirstInterface.css";
import { Link } from 'react-router-dom'
import ListCompras from "./TOOLS/ListCompras.js";

var  listaDeCompras = require('./DATA/ComprasJData.json');

class FirstInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <div style={{padding:"20px", height:"100%", width:"100%", float:"left", backgroundColor:"inherit", textAlign:"center"}}>
          <Link to="/Graph" className="linkG">Ir a las Gráficas</Link>

          <h1 style={{marginTop:"10px"}}>Especificaciones de Nuevo Contrato Público </h1>

          <div style={{textAlign:"left", marginBottom:"20px"}}>
            <h4 style={{marginBottom:"0px"}}>Describe el Contrato:</h4>
            <textarea rows="6" cols="68" placeholder="Descripción." name="comment" form="usrform"/>
          </div>

          <h3>Escoge Especificaciones de Infraestructura y Material que deben ir incluidos en el Contrato: </h3>
          <ListCompras data={listaDeCompras} />

          <div style={{textAlign:"left", marginBottom:"20px"}}>
            <h4 style={{marginBottom:"0px"}}>COMENTARIO</h4>
            <textarea rows="6" cols="68" placeholder="Escribe tu comentario aquí." name="comment" form="usrform"/>
          </div>

          <button>TERMINAR</button>
        </div>
      </div>
    );
  }
}

export default FirstInterface;
