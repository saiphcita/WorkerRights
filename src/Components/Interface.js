import React, { Component } from 'react';

import Graph1 from "./Tools/Graph1";
import Graph2 from "./Tools/Graph2";

import RamoGraph from "./Tools/RamoGraph";

import StatisticsBi from "./Tools/StatisticsBi";
import StatisticsMi from "./Tools/StatisticsMi";
import StatisticsK from "./Tools/StatisticsK";
import StatisticsCi from "./Tools/StatisticsCi";

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
        localStorage.setItem("jsonData", "")
        window.location.reload();
    }
}

//MINANDO EL JSON
for (let i=0; i < programas.length; i++){
    if(programas[i].name === jsonName){

        var arrayInstituciones = [];
        var arrayInstitucionesMontos = [];

        //Si los childrenDads se repiten
        var arreyOfChildrenDads = programas[i].jsonD.children.map(i => {return i.name})
        var uniqueChildrenDads = [...new Set(arreyOfChildrenDads)];
        uniqueChildrenDads = uniqueChildrenDads.map(i => {return {"name":i, "children":[], "type": ""}})

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

        //verificando si los datos de los childrenDads son billones, millones o miles
        var newChildrensDivideByType = []
        for(let j=0; j<programas[i].jsonD.children.length; j++){
            newChildrensDivideByType.push( {"name": programas[i].jsonD.children[j].name, "children": [], "type":[]} )
        }

        for(let j=0; j<programas[i].jsonD.children.length; j++){
            var arraySizes = []
            for(let l=0; l<programas[i].jsonD.children[j].children.length ;l++){
                arraySizes.push(programas[i].jsonD.children[j].children[l].size)
                if(programas[i].jsonD.children[j].children[l].size.toString().length >= 10){
                    programas[i].jsonD.children[j].children[l].num = "bi"
                }else if(programas[i].jsonD.children[j].children[l].size.toString().length <= 9 && programas[i].jsonD.children[j].children[l].size.toString().length > 6){
                    programas[i].jsonD.children[j].children[l].num = "mi"
                }else if(programas[i].jsonD.children[j].children[l].size.toString().length <= 6 && programas[i].jsonD.children[j].children[l].size.toString().length > 4){
                    programas[i].jsonD.children[j].children[l].num = "k"
                }else if(programas[i].jsonD.children[j].children[l].size.toString().length <= 4){
                    programas[i].jsonD.children[j].children[l].num = "ci"
                }
                newChildrensDivideByType[j].type.push(programas[i].jsonD.children[j].children[l].num)
                newChildrensDivideByType[j].children.push(programas[i].jsonD.children[j].children[l])
            }
        }

        //CREANDO LOS NUEVOS CHILDRENS
        var newChildrensDivideByNum = []
        for(let j=0; j<newChildrensDivideByType.length; j++){

            newChildrensDivideByType[j].type = [...new Set(newChildrensDivideByType[j].type)]

            for(let l=0; l<newChildrensDivideByType[j].type.length; l++){
                newChildrensDivideByNum.push({"name": newChildrensDivideByType[j].name, "children": newChildrensDivideByType[j].children, "type":newChildrensDivideByType[j].type[l]})
            }
        }


        var arrayOfChildrenDivide = []
        for(let j=0; j<newChildrensDivideByNum.length; j++){
            arrayOfChildrenDivide.push({"name": newChildrensDivideByNum[j].name, "children": [], "type":newChildrensDivideByNum[j].type })

            for(let l=0; l<newChildrensDivideByNum[j].children.length; l++){
                if(arrayOfChildrenDivide[j].type === newChildrensDivideByNum[j].children[l].num){
                    arrayOfChildrenDivide[j].children.push(newChildrensDivideByNum[j].children[l])
                }
            }
        }

        programas[i].jsonD.children = arrayOfChildrenDivide


        //Generalizando cada Institucion
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
            for(let i=0; i<uniqueInstituciones.length;i++){
                const objectSubGraph = {
                    "name": uniqueInstituciones[i][0],
                    "value": (uniqueInstituciones[i][1].reduce((a, b) => a + b, 0) / 1000000000)
                };
    
                jsonSubGraph.push(objectSubGraph)
            }
        }
        var miBi = programas[i].millones


        //TODA LOS DATOS PARA STATISTICS
        var jsonData = programas[i].jsonD

        var dataArrayBi = []
        for(let i=0; i<jsonData.children.length; i++){
            if(jsonData.children[i].type === "bi"){
                dataArrayBi.push(jsonData.children[i])
            }
        }

        var dataArrayMi = []
        for(let i=0; i<jsonData.children.length; i++){
            if(jsonData.children[i].type === "mi"){
                dataArrayMi.push(jsonData.children[i])
            }
        }

        var dataArrayK = []
        for(let i=0; i<jsonData.children.length; i++){
            if(jsonData.children[i].type === "k"){
                dataArrayK.push(jsonData.children[i])
            }
        }

        var dataArrayCi = []
        for(let i=0; i<jsonData.children.length; i++){
            if(jsonData.children[i].type === "ci"){
                dataArrayCi.push(jsonData.children[i])
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
        onClick={()=>{ localStorage.setItem("statePage", 0); localStorage.setItem("jsonData", ""); window.location.reload();}}>
            Volver
        </button>
    </div>

    var button2 = <div style={{width:"1340px", height:"45px", backgroundColor:"black"}}>
        <button style={{backgroundColor:"black", width:"420px", height:"100%", color:"white", float:"left", border:"none", padding:"0"}}>Gráfica de Razones de Gastos</button>
        <button
        style={{width:"325px", height:"100%", color:"black", backgroundColor:"#80cbc4", float:"right", border:"none", cursor:"pointer", padding:"0"}}
        onClick={()=>{ localStorage.setItem("statePage", 1); window.location.reload();}}>
            Volver
        </button>
    </div>

    var page = <div>
        <Graph1/>
        <Graph2/>
    </div>
    
    //PAGINA PRINCIPAL
    if(this.state.statePage === "0" || this.state.statePage === ""){
        page = <div>
            <h3 style={{width:"1340px", margin:"0", padding:"12px 0", backgroundColor:"black", color:"white", textAlign:"center"}}>
                Gráfica Principal
            </h3>
            <Graph1/>
            <Graph2/>
        </div>
    }
    //PAGINA DE LAS INSTITUCIONES
    else if(this.state.statePage === "1"){
        page = <div>
            {button}
            <h1 style={{width:"1340px", margin:"0px", padding:"12px 0", textAlign:"center", backgroundColor:"#2F4A6D", color:"white"}}>{localStorage.getItem("jsonData")}</h1>
            <RamoGraph data={jsonSubGraph} miBi={miBi}/>
        </div>
    }
    //PAGINA DE LAS RAZONES DE GASTOS
    else if(this.state.statePage === "2"){
        page = <div>
            {button2}
            <h2 style={{width:"1340px", margin:"0", padding:"14px 0", textAlign:"center", backgroundColor:"#2F4A6D", color:"white"}}>{localStorage.getItem("subData")}</h2>
            <StatisticsBi jsonData={dataArrayBi} miBi={miBi}/>
            <StatisticsMi jsonData={dataArrayMi} miBi={miBi}/>
            <StatisticsK jsonData={dataArrayK} miBi={miBi}/>
            <StatisticsCi jsonData={dataArrayCi} miBi={miBi}/>
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
