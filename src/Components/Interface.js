import React, { Component } from 'react';
import Graph1 from "./Tools/Graph1";
import Graph2 from "./Tools/Graph2";
import Interface2 from "./Interface2";
import Statistics1 from "./Tools/Statistics1"
import Statistics2 from "./Tools/Statistics2"

var  programas = require('./Data/Programas.json');
var jsonName = String(localStorage.getItem("jsonData"));

//viendo si el jsonData ha mutado o no existe
if (jsonName.length !== 0){
    var arrayofNames = []
    for (let i=0; i < programas.length; i++){
        arrayofNames.push(programas[i].name)
    }

    if (!arrayofNames.includes(jsonName)){
        localStorage.setItem("statePage", 0);
        window.location.reload();
    }
}

for (let i=0; i < programas.length; i++){
    if(programas[i].name === jsonName){

        var arrayInstituciones = [];
        var arrayInstitucionesMontos = [];

        //Si los childrenDads se repiten
        var arreyOfChildrenDads = programas[i].jsonD.children.map(i => {return i.name})
        var uniqueChildrenDads = [...new Set(arreyOfChildrenDads)];
        uniqueChildrenDads = uniqueChildrenDads.map(i => {return {"name":i, "children":[], "millones": true}})

        for(let j=0; j<programas[i].jsonD.children.length; j++){
            for(let k=0; k<uniqueChildrenDads.length; k++){
                if(uniqueChildrenDads[k].name === programas[i].jsonD.children[j].name){
                    for(let l=0; l<programas[i].jsonD.children[j].children.length ;l++){
                        uniqueChildrenDads[k].children.push(programas[i].jsonD.children[j].children[l])
                    }
                }
            }
        }

        programas[i].jsonD.children = uniqueChildrenDads

        //verificando si los datos de los childrenDads son millones o billones
        for(let j=0; j<programas[i].jsonD.children.length; j++){
            var arraySizes = []
            for(let l=0; l<programas[i].jsonD.children[j].children.length ;l++){
                arraySizes.push(programas[i].jsonD.children[j].children[l].size)
            }
            var sizeTotal = arraySizes.reduce((a, b) => a + b, 0)
            if(sizeTotal > 1000000000){
                programas[i].jsonD.children[j].millones = 0;
            }
        }


        //Nombrando instituciones
        for (let j=0; j < programas[i].jsonD.children.length; j++){
            for (let t=0; t < programas[i].jsonD.children[j].children.length; t++){

                arrayInstituciones.push(programas[i].jsonD.children[j].children[t].ramo);
                arrayInstitucionesMontos.push([programas[i].jsonD.children[j].children[t].ramo, programas[i].jsonD.children[j].children[t].size]);
            }
        };

        var uniqueInstituciones = [...new Set(arrayInstituciones)];
        for(let i=0; i<uniqueInstituciones.length;i++){

            var UI = [uniqueInstituciones[i], []]

            for(let j=0; j < arrayInstitucionesMontos.length;j++){
                if(uniqueInstituciones[i] === arrayInstitucionesMontos[j][0]){
                    UI[1].push(arrayInstitucionesMontos[j][1])
                }
            }
            uniqueInstituciones[i] = UI
        }

        //Para la Sub-Grafica de instituciones
        var jsonSubGraph  = [];
        //para Millones
        if(programas[i].millones){
            for(let i=0; i<uniqueInstituciones.length;i++){
                const objectSubGraph = {
                    "name": uniqueInstituciones[i][0],
                    "value": (uniqueInstituciones[i][1].reduce((a, b) => a + b, 0) / 1000000)
                };
    
                jsonSubGraph.push(objectSubGraph)
            }
        //para Billones
        }else{
            if(jsonName === "Defensa y Soberanía Nacional"){
                var objectSubGraph = {
                    "name": uniqueInstituciones[0][0],
                    "value": (uniqueInstituciones[0][1].reduce((a, b) => a + b, 0) / 1000000000)
                };

                jsonSubGraph.push(objectSubGraph)
            }else{
                for(let i=0; i<uniqueInstituciones.length;i++){
                    objectSubGraph = {
                        "name": uniqueInstituciones[i][0],
                        "value": (uniqueInstituciones[i][1].reduce((a, b) => a + b, 0) / 1000000000)
                    };
        
                    jsonSubGraph.push(objectSubGraph)
                }
            }
        }
        var miBi = programas[i].millones

        //TODA LOS DATOS PARA STATISTICS
        var jsonData = programas[i].jsonD

        var dataArrayMi = []
        for(let i=0; i<jsonData.children.length; i++){
            if(jsonData.children[i].millones){
                dataArrayMi.push(jsonData.children[i])
            }
        
        }
        var dataArrayBi = []
        for(let i=0; i<jsonData.children.length; i++){
            if(!jsonData.children[i].millones){
                dataArrayBi.push(jsonData.children[i])
            }
        }

    }
}
//AQUI TERMINA JSON DATA -----------------------------------------------------------------


class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount(){
    this.setState({statePage: localStorage.getItem("statePage")});
    this.setState({jsonData: localStorage.getItem("jsonData")});
};

  render() {
    var button = <div style={{width:"1340px", height:"45px", backgroundColor:"black"}}>
                    <button style={{backgroundColor:"black", width:"420px", height:"100%", color:"white", float:"left", border:"none", padding:"0"}}>Gráfica de Instituciones</button>
                    <button
                      style={{width:"325px", height:"100%", color:"black", backgroundColor:"#80cbc4", float:"right", border:"none", cursor:"pointer", padding:"0"}}
                      onClick={()=>{ localStorage.setItem("statePage", 0); localStorage.setItem("jsonData", ""); window.location.reload();}}>Volver</button>
                  </div>

    var button2 = <div style={{width:"1340px", height:"45px", backgroundColor:"black"}}>
                  <button style={{backgroundColor:"black", width:"420px", height:"100%", color:"white", float:"left", border:"none", padding:"0"}}>Gráfica de Razones de Gastos</button>
                  <button
                    style={{width:"325px", height:"100%", color:"black", backgroundColor:"#80cbc4", float:"right", border:"none", cursor:"pointer", padding:"0"}}
                    onClick={()=>{ localStorage.setItem("statePage", 1); window.location.reload();}}>Volver</button>
                  </div>

    var page = <div><Graph1/><Graph2/></div>
    
    if(this.state.statePage === "0"){
      page = <div><h3 style={{width:"1340px", margin:"0", padding:"12px 0", backgroundColor:"black", color:"white", textAlign:"center"}}>Gráfica Principal</h3><Graph1/><Graph2/></div>
    }else if(this.state.statePage === "1"){
      page = <div>{button}<Interface2 jsonSubGraph={jsonSubGraph} miBi={miBi}/></div>
    }else if(this.state.statePage === "2"){
      page = <div>
                {button2}
                <h2 style={{width:"1340px", margin:"0", padding:"24px 0", textAlign:"center", backgroundColor:"#2F4A6D", color:"white"}}>{localStorage.getItem("subData")}</h2>
                <Statistics1 jsonData={dataArrayBi} miBi={miBi}/>
                <Statistics2 jsonData={dataArrayMi} miBi={miBi}/>
            </div>
    }

    return (
      <div>
        {page}
      </div>
    );
  }
}

export default Interface;
