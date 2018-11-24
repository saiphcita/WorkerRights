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
        <div style={{height:"100%", width:"100%", float:"left", backgroundColor:"inherit", textAlign:"center"}}>
          <div style={{margin:"2.8% 4%"}}>

            <Link to="/Graph" className="linkG">Ir a las Gráficas</Link>

            <h1 style={{marginTop:"2%"}}>Especificaciones de Nuevo Contrato Público </h1>

            <div style={{textAlign:"left", marginBottom:"5%"}}>
              <h4 style={{marginBottom:"0"}}>Nombre del Contrato:</h4>
              <textarea rows="1" placeholder="Nombre." name="nombre" form="usrform"/>
            </div>

            <div style={{textAlign:"left", marginBottom:"5%"}}>
              <h4 style={{marginBottom:"0"}}>Describe el Contrato:</h4>
              <textarea rows="6" placeholder="Descripción." name="descripción" form="usrform"/>
            </div>

            <h3>Escoge Especificaciones de Infraestructura y Material que deben ir incluidos en el Contrato: </h3>
            <ListCompras data={listaDeCompras} />

            <div style={{textAlign:"left", marginBottom:"5%"}}>
              <h4 style={{marginBottom:"0"}}>COMENTARIO</h4>
              <textarea rows="6" placeholder="Escribe tu comentario aquí." name="comentario" form="usrform"/>
            </div>
            
            <button>TERMINAR</button>

          </div>
        </div>
      </div>
    );
  }
}

export default FirstInterface;
