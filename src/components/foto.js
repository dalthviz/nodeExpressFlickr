import React, { Component } from 'react';

class Foto extends Component {

  getUrl() {
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

  render() {
    return(
      <div className="">
        <src src={this.getUrl} className=/>
      </div>
    )
  }
}

export default Buscador;
