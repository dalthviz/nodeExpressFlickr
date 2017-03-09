import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Buscador from './components/buscador';
import axios from 'axios';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
        imagenesAzul: [],
        imagenesAmarillo: [],
        imagenesRojo: [],
        imagenesVerde: [],
        imagenesVioleta: [],
        imagenesNaranja: [],

      }
    }


    buscarImagenes(term, callback) {
      axios.get("http://localhost:9000/flickr/"+term+" blue")
      .then(function(response) {
        if(response.statusText === 'OK') {
          callback({imagenesAzul : response.data.photos.photo});
        }
        throw new Error('Network response was not ok.');
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
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
          <Buscador buscarImagenes={this.buscarImagenes} />
      </div>
    );
  }
}

export default App;
