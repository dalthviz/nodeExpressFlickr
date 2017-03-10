import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Buscador from './components/buscador';
import ColumnaFoto from './components/columnaFoto';
import Comentarios from './components/comentarios';
import axios from 'axios';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
        blue: [],
        yellow: [],
        red: [],
        green: [],
        violet: [],
        orange: [],
        show: 'hidden',
        comentarios: [],
        foto: {}

      }
    }


    buscarImagenes = (term) => {
      axios.get("flickr/"+term+",blue")
      .then((response) => {
        if(response.statusText === 'OK') {
          this.setState({blue : response.data.photos.photo});
          return response;
        }
        throw new Error('Network response was not ok.');
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });

      axios.get("flickr/"+term+",yellow")
      .then((response) => {
        if(response.statusText === 'OK') {
          this.setState({yellow : response.data.photos.photo});
          return response;
        }
        throw new Error('Network response was not ok.');
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });

      axios.get("flickr/"+term+",red")
      .then((response) => {
        if(response.statusText === 'OK') {
          this.setState({red : response.data.photos.photo});
          return response;
        }
        throw new Error('Network response was not ok.');
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });

      axios.get("flickr/"+term+",green")
      .then((response) => {
        if(response.statusText === 'OK') {
          this.setState({green : response.data.photos.photo});
          return response;
        }
        throw new Error('Network response was not ok.');
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });

      axios.get("flickr/"+term+",violet")
      .then((response) => {
        if(response.statusText === 'OK') {
          this.setState({violet : response.data.photos.photo});
          return response;
        }
        throw new Error('Network response was not ok.');
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });

      axios.get("flickr/"+term+",indigo")
      .then((response) => {
        if(response.statusText === 'OK') {
          this.setState({indigo : response.data.photos.photo});
          return response;
        }
        throw new Error('Network response was not ok.');
      })
      .catch((error) => {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
    }

    toggleComentarios = (toggle) => {
      this.setState({show: toggle});
    }

    agregarComentario = (comentario) => {
      //this.setState({show:'hidden'});
      var id_foto = this.state.foto.id;
      axios.post("comentarios",
                {comentario: comentario, id_foto: id_foto})
      .then(response => {
        this.obtenerComentarios();
      }).catch(err => {
        console.log(err.message);
      });
    }

    obtenerComentarios = () => {
        var id_foto = this.state.foto.id;
        axios.get("fotos/"+id_foto+"/comentarios")
        .then(response => {
            this.setState({comentarios: response.data});
          }).catch(err => {
            console.log(err.message);
          });
    }

    imagenActual = (foto) => {
      this.setState({foto: foto, show: 'show'});
      this.obtenerComentarios();
    }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
        </p>
          <Comentarios foto={this.state.foto} show={this.state.show} modalAction={this.toggleComentarios.bind(this)} agregarComentario={this.agregarComentario.bind(this)} comentarios={this.state.comentarios} />
          <Buscador buscarImagenes={this.buscarImagenes.bind(this)} />
          <div className="row">
          <ColumnaFoto imagenes={this.state.blue} modalAction={this.toggleComentarios.bind(this)} imagenActual={this.imagenActual.bind(this)}/>
          <ColumnaFoto imagenes={this.state.yellow} modalAction={this.toggleComentarios.bind(this)} imagenActual={this.imagenActual.bind(this)}/>
          <ColumnaFoto imagenes={this.state.red} modalAction={this.toggleComentarios.bind(this)} imagenActual={this.imagenActual.bind(this)}/>
          <ColumnaFoto imagenes={this.state.green} modalAction={this.toggleComentarios.bind(this)} imagenActual={this.imagenActual.bind(this)}/>
          <ColumnaFoto imagenes={this.state.violet} modalAction={this.toggleComentarios.bind(this)} imagenActual={this.imagenActual.bind(this)}/>
          <ColumnaFoto imagenes={this.state.orange} modalAction={this.toggleComentarios.bind(this)} imagenActual={this.imagenActual.bind(this)}/>
          <ColumnaFoto imagenes={this.state.indigo} modalAction={this.toggleComentarios.bind(this)} imagenActual={this.imagenActual.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
