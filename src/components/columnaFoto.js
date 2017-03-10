import React, { Component } from 'react';
import Foto from './foto';

class ColumnaFoto extends Component {


  render() {
    console.log("ColumnaFoto");
    console.log(this);
    return(
      <div className="columna">
        {this.props.imagenes && this.props.imagenes.map((foto)=>{
          return <Foto key={foto.id} foto={foto} imagenActual={this.props.imagenActual} modalAction={this.toggleComentarios}/>
        })}
      </div>
    )
  }
}

export default ColumnaFoto;
