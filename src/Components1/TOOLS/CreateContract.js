import React, { Component } from 'react';
import "../CSS/CreateContract.css";
import { Link } from 'react-router-dom'
import ListCompras from "./ListCompras.js";

var  listaDeCompras = require('../DATA/ComprasJData.json');

class CreateContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameV: "",
      descripciónV: "",
      comentarioV: "",
      arrayEspecificaciones: []
    };
    this.changeName = this.changeName.bind(this);
    this.changeDescripción = this.changeDescripción.bind(this);
    this.changeComentario = this.changeComentario.bind(this);
    this.changEespecificaciones = this.changEespecificaciones.bind(this);
  }

  changeName(event){ this.setState({nameV: event.target.value}) }
  changeDescripción(event){ this.setState({descripciónV: event.target.value}) }
  changeComentario(event){ this.setState({comentarioV: event.target.value}) }
  changEespecificaciones(event){
    var newyArrayE = this.state.arrayEspecificaciones
    newyArrayE.push(event.target.value);
    var count = {};
    newyArrayE.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    function isOdd(num) { return num % 2;}
    var arrayToUse = []
    for (var compra in count) {
      count[compra] = isOdd(count[compra])
      if(count[compra]=== 1){
        arrayToUse.push(compra)
      }
    }
    this.setState({arrayEspecificaciones: arrayToUse})
  }

  submitContrato(){
    if(this.state.nameV.length !== 0 && this.state.descripciónV.length !== 0 && this.state.arrayEspecificaciones.length !== 0){
      localStorage.setItem("contratoH", true)
      localStorage.setItem("nameC", this.state.nameV);
      localStorage.setItem("descripciónC", this.state.descripciónV);
      localStorage.setItem("especificacionesC", this.state.arrayEspecificaciones);
      localStorage.setItem("comentarioC", this.state.comentarioV);
      window.location.reload();
    }else{
      localStorage.setItem("contratoH", false)
    }
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
              <textarea onChange={this.changeName} value={this.state.nameV} rows="1" placeholder="Nombre." name="nombre" form="usrform" style={{width:"40%"}}/>
            </div>

            <div style={{textAlign:"left", marginBottom:"5%"}}>
              <h4 style={{marginBottom:"0"}}>Describe el Contrato:</h4>
              <textarea onChange={this.changeDescripción} value={this.state.descripciónV} rows="6" placeholder="Descripción." name="descripción" form="usrform"/>
            </div>

            <h3>Escoge Especificaciones de Infraestructura y Material que deben ir incluidos en el Contrato: </h3>
            <ListCompras data={listaDeCompras} change={this.changEespecificaciones} />

            <div style={{textAlign:"left", marginBottom:"5%"}}>
              <h4 style={{marginBottom:"0"}}>COMENTARIO</h4>
              <textarea onChange={this.changeComentario} value={this.state.comentarioV} rows="6" placeholder="Escribe tu comentario aquí." name="comentario" form="usrform"/>
            </div>

            <button className="buttonContract" onClick={this.submitContrato.bind(this)}>Crear Contrato</button>

          </div>
        </div>
      </div>
    );
  }
}

export default CreateContract;
