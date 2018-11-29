import React, { Component } from 'react';
import '../CSS/ListCompras.css';

class ListCompras extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataJ: this.props.data
      }
    };

    componentDidMount(){
      for(let i = 0; i < this.state.dataJ.length; i++){
        var actName = this.state.dataJ[i].name+"butt"
        this.setState({[actName]: false})
      }
    }
  
    render() {
      return (
        <div className="DivCompras">
          {this.state.dataJ.map((val, ind) =>{
            var lmao = val["name"]+"butt"
            return(
              <div key={val["name"]}>

                <div className="name-img" onClick={()=>{this.setState({[lmao]: !this.state[lmao]}); console.log(!this.state[lmao])}}>
                  {val["name"]}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/MediaWiki_Vector_skin_action_arrow.svg/2000px-MediaWiki_Vector_skin_action_arrow.svg.png" alt="lol" />
                </div>

                <EachList data={val["children"]} state={this.state[lmao]} change={this.props.change}/>
              </div>
            )
          })}
        </div>
      );
    }
  }


  class EachList extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    };


    render() {
      var eachList = <div style={{border: "1px solid black"}}>
                        {this.props.data.map((value, indx) =>{
                          return (
                            <div key={indx} className="Clist">
                              <li style={{width:"80%", maxWidth:"80%", textAlign:"left", paddingLeft:"8px", fontSize:"1rem"}}>{value.toUpperCase()}</li>
                              <li style={{width:"20%", maxWidth:"20%"}}> <input onChange={this.props.change} type="checkbox" name="compras" value={value}/> </li>
                            </div>
                          )
                        })}
                      </div>
      
      if(!this.props.state){
        eachList = <div/>
      }else{
        eachList = <div style={{border: "1px solid black"}}>
                        {this.props.data.map((value, indx) =>{
                          return (
                            <div key={indx} className="Clist">
                              <li style={{width:"80%", maxWidth:"80%", textAlign:"left", paddingLeft:"8px", fontSize:"1rem"}}>{value.toUpperCase()}</li>
                              <li style={{width:"20%", maxWidth:"20%"}}> <input onChange={this.props.change} type="checkbox" name="compras" value={value}/> </li>
                            </div>
                          )
                        })}
                      </div>
      }

      return (
        eachList  
      );
    }
  }



export default ListCompras;