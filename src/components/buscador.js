import React, { Component } from 'react';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  buscar = (e) => {
    e.preventDefault();
    this.props.buscarImagenes(this.state.term);
  }

  actualizar = (termino) => {
    this.setState({term: termino});

  }


  render() {
    return(
      <div className="col-md-12 buscador">
        <input type="text" onChange={(event) => this.actualizar(event.target.value)}/>
        <button onClick={(event) => {this.buscar(event)}}>
          Buscar
        </button>
      </div>
    )
  }
}

export default Buscador;
