import React, { Component } from 'react';
import "../CSS/ContractG.css";
import { Link } from 'react-router-dom'

var  listaDeCompras = require('../DATA/ComprasJData.json');

class ContractG extends Component {
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

            <h1 style={{marginTop:"2%"}}>Contrato: </h1>

            <div style={{textAlign:"left", marginBottom:"1%"}}>
              <h3 style={{marginBottom:"0", color:"#80cbc4"}}>Nombre del Contrato:</h3>
              <p>{localStorage.getItem("nameC")}</p>
            </div>

            <div style={{textAlign:"left", marginBottom:"2%"}}>
              <h3 style={{marginBottom:"0", color:"#80cbc4"}}>Descripción:</h3>
              <p>{localStorage.getItem("descripciónC")}</p> 
            </div>

            <div style={{textAlign:"left", marginBottom:"2%"}}>
              <h3 style={{marginBottom:"0", color:"#80cbc4"}}>Comentario:</h3>
              <p>{localStorage.getItem("comentarioC")}</p>
            </div>

            <div style={{textAlign:"left", marginBottom:"2%"}}>
              <h3 style={{marginBottom:"0", color:"#80cbc4"}}>Listado:</h3>
              <ListadoX data={listaDeCompras} arrayData={localStorage.getItem("especificacionesC")} />
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
      dataJ: this.props.data
    }
  };

  render() {
    var espe = this.props.arrayData.split(',');
    for(let i = 0; i < espe.length; i++){
      if(espe[i][0] === " "){
        espe[i] = espe[i-1] + espe[i]
        espe[i-1] = espe[i]
      }
    }
    var uniqEspe = [ ...new Set(espe) ]

    var onlyNames = []
    for(let i = 0; i < this.state.dataJ.length; i++){
      for(let j = 0; j <uniqEspe.length; j++){
        if(this.state.dataJ[i].children.includes(uniqEspe[j])){
          onlyNames.push([this.state.dataJ[i].name, uniqEspe[j]])
        }
      }
    }

    var arrayDJToUse = []
    for(let i=0; i< onlyNames.length; i++){
      arrayDJToUse.push(onlyNames[i][0])
    }
    arrayDJToUse = [ ...new Set(arrayDJToUse) ]

    for(let i=0; i< arrayDJToUse.length; i++){
      arrayDJToUse[i] = {
        "name": arrayDJToUse[i],
        "children": []
      }
    }
    for(let i=0; i< arrayDJToUse.length; i++){
      for(let j=0; j< onlyNames.length; j++){
        if(arrayDJToUse[i].name === onlyNames[j][0]){
          arrayDJToUse[i].children.push(onlyNames[j][1])
        }
      }
    }




    return (
      <div className="DivCompras">
        {arrayDJToUse.map((val, ind) =>{
          return(
            <div key={val["name"]}>

              <p style={{color:"#80cbc4", fontSize:"1rem", marginBottom:"0"}}>{val["name"]}</p>
              <div style={{border: "1px solid black"}}>
                {val["children"].map((value, indx) =>{
                  return (
                    <div key={indx} className="Clist">
                      <li style={{width:"100%", maxWidth:"100%", textAlign:"left", paddingLeft:"8px", fontSize:"0.8rem"}}>{value.toUpperCase()}</li>
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
