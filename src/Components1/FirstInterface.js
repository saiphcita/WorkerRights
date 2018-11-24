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

          <h2 style={{marginTop:"0"}}>Requerimientos de Compras: </h2>
          <ListCompras data={listaDeCompras} />

          <h2>Comentarios </h2>
          <form>
              <input type="text" name="comentario" />
          </form>

        </div>
      </div>
    );
  }
}

export default FirstInterface;
