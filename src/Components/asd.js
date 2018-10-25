    d3.select("body")
        .selectAll("div")
        .data(this.state.data)
        .enter().append("div")
          .text((d) => {
            if(d[26] === undefined){ d[26] = "0" }
            if(d[0] === undefined){ d[0] = "0" }
            if(d[32] === undefined){ d[32] = "0" }
            if(d[36] === undefined){ d[36] = "0" }
            return "Nombre: "+d[26]+" --Tipo:" +d[22]+" --Fecha: "+d[0]+" --Monto Total: "+d[32]+" --Monto Pagado: "+d[36]
          } 
        );