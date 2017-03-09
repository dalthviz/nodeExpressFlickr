import React, { Component } from 'react';
import Foto from 'foto';

class ColumnaFoto extends Component {


  render() {
    return(
      <div className="">
        {this.props.fotos.map((foto)=>{
          return <Foto foto={foto} />
        })}
      </div>
    )
  }
}

export default Buscador;
