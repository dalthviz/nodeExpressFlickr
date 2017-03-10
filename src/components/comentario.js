import React, {Component } from 'react';
import axios from 'axios';

class Comentarios extends Component {

  render() {
    return (
      //TODO estructura de un elemento tarea
      <div className="row fixed-container">
      <div className="col-xs-1"></div>
      <div className={"comentario-container col-xs-10 "+this.props.show}>

      <div className="col-xs-12">
        <div className="row">

        <div className="col-xs-12">
        <img src={this.props.url} />
        </div>

        <div className="col-xs-12">
        <h3>Un nuevo comentario</h3>
        </div>
        </div>
        <form>

          <div className="form-group row">
            <div className="col-xs-4">
              <label >Comentario:</label>
            </div>
            <div className="col-xs-8">
              <input id="comentario" name="comentario" type="text" placeholder="Su comentario" value={this.state.user_name}
                onChange={this.setText} />
            </div>
          </div>
          <div className="form-group row">
          <div className="col-xs-4">
            <label htmlFor="description">Email:</label>
            </div>
            <div className="col-xs-8">
            <input id="email" name="email" type="email" placeholder="ejemplo@ejemplo.com" value={this.state.email}
            onChange={this.setText}/>
            </div>
          </div>

          <div className="form-group row">
          <div className="col-xs-9">
            <label htmlFor="importance">¿Recibir email con tareas ordenadas los sabados? </label>
          </div>
          <div className="col-xs-3">
          <input id="subscribed" type="checkbox" name="subscribed" checked={this.state.subscribed==="true"}
                      onChange={this.setSubscribed} />

          </div>
          </div>

          <div className="row">
            <div className="col-sm-7 col-xs-2"></div>
            <div className="col-sm-1 col-xs-2">
              <div ref="loading" className="loading-hmk hidden"></div>
              <div ref="error" className="red hidden">Error</div>
            </div>
            <div className="col-sm-2 col-xs-4">
              <button className="btn btn-danger add-hmk-cancel" onClick={this.close}>Cancelar</button>
            </div>
            <div className="col-sm-2 col-xs-4" >
              <button className="btn btn-primary add-hmk-accept" onClick={this.send}>Aceptar</button>
            </div>
          </div>

        </form>
        </div>
      </div>
        <div className="col-xs-1"></div>
        </div>
    );
  }
}

export default Comentario;
