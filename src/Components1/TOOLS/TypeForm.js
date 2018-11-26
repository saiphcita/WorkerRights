import React from 'react';
import * as typeformEmbed from '@typeform/embed'
import { Link } from 'react-router-dom'
import "../CSS/CreateContract.css";

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
        buttonText: false,
        hideScrollbars: true,
        opacity: 100
      });
    }
  }
  render() {
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Link to="/Graph" className="linkG">Ir a las Gráficas</Link>
            <h1 style={{margin:"0", padding:"0", textAlign:"center", color: "#EFDB49", backgroundColor:"#39A2A3"}}>Especificaciones de Nuevo Contrato Público </h1>
            <div ref={(el) => this.el = el} style={{width: '100%', height: '100%'}} />
        </div>
    )
  }
}

export default Form;