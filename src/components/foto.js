import React, { Component } from 'react';

class Foto extends Component {

  constructor(props){
    super(props);
    this.state={comentarios:[],
                comentario: ''};
  }

  getUrl() {
    if(this.props.foto){
        return "https://farm"+
            this.props.foto.farm +
            ".staticflickr.com/" +
            this.props.foto.server +
            "/"+
            this.props.foto.id+
            "_" +
            this.props.foto.secret +
            "_s.jpg";
          }
    }

  imagen = (e) => {
    e.preventDefault();
    this.props.imagenActual(this.props.foto);
  }

  render() {
    return(
      <div className="">
        <a href="#" onClick={(event) => {this.imagen(event)}} ><img src={this.getUrl()} alt="this.props.foto.title" /></a>
      </div>
    )
  }
}

export default Foto;
