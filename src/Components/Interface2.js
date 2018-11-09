import React, { Component } from 'react';
import SubGraph from "./Tools/SubGraph.js"
import Statistics1 from "./Tools/Statistics1"
import Statistics2 from "./Tools/Statistics2"

var  programas = require('./Data/Programas.json');
var jsonName = String(localStorage.getItem("jsonData"));

//JSON DATA
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

                if(programas[i].jsonD.children[j].children[t].ramo === "Relaciones"){
                    programas[i].jsonD.children[j].children[t].ramo = "Relaciones Exteriores"
                }else if(programas[i].jsonD.children[j].children[t].ramo === "Defensa"){
                    programas[i].jsonD.children[j].children[t].ramo = "Defensa Nacional"
                }else if(programas[i].jsonD.children[j].children[t].ramo === "Hacienda"){
                    programas[i].jsonD.children[j].children[t].ramo = "Hacienda y Crédito Público"
                }else if(programas[i].jsonD.children[j].children[t].ramo === "Gobernacion"){
                    programas[i].jsonD.children[j].children[t].ramo = "Gobernación"
                };

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
       
        //tamaños de la grafica
        var MarginLeftJson = programas[i].sizes[0]
        var heightJson = programas[i].sizes[1]

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

//AQUI TERMINA JSON DATA


class Interface2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [ ],
          titleStati: localStorage.getItem("jsonData")
        };
      }

    render() {
      return(
        <div>
            <h1 style={{width:"1340px", margin:"0px", padding:"20px 0", textAlign:"center", backgroundColor:"#2F4A6D", color:"black"}} >{this.state.titleStati}</h1>
            <SubGraph data = {jsonSubGraph} miBi={miBi}/>
            <Statistics1 MarginLeftJson={MarginLeftJson} heightJson={heightJson} jsonData={dataArrayBi} miBi={miBi}/>
            <Statistics2 MarginLeftJson={MarginLeftJson} heightJson={heightJson} jsonData={dataArrayMi} miBi={miBi}/>
        </div>
      )
    }
}


export default Interface2;