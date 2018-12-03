import React from 'react';
import * as typeformEmbed from '@typeform/embed'
import { Link } from 'react-router-dom'
import "../CSS/LinksStyle.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.el = null;
  }
  componentDidMount() {
    if (this.el) {
      typeformEmbed.makeWidget(this.el, "https://oscarorellana1.typeform.com/to/fKu7SZ", {
        hideFooter: true,
        hideHeaders: true,
        autoOpen: true,
        hideScrollbars: true,
        opacity: 100,
        onSubmit: () => {
          localStorage.setItem("contratoH", true);
          window.location.reload();
        }
      });
    }
  }
  render() {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <div className="linkGen">
              <img src="./image.png" alt="logo" />
              <Link to="" className="link1g">Crear Nuevo Anuncio de Contrato</Link>
              <Link to="/Contratos" className="link2g">Ver Anuncios de Contratos</Link>
              <Link to="/Graph" className="link2g">Visualizar Compras Públicas</Link>
            </div>
            <h1 style={{margin:"0", padding:"0", textAlign:"center", color: "#EFDB49", backgroundColor:"#39A2A3"}}>Especificaciones de Nuevo Contrato Público </h1>
            <div ref={(el) => this.el = el} style={{width: '100%', height: '85%'}} />
        </div>
    )
  }
}

export default Form;