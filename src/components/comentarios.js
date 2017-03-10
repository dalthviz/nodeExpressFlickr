import React, {Component } from 'react';

class Comentarios extends Component {

  constructor(props){
    super(props);
    this.state = {
      comentario: ''
    };
  }

  setText = (e) => {
    e.preventDefault();
    this.setState({comentario: e.target.value});
  }

  agregar = (e) => {
    e.preventDefault();
    this.props.agregarComentario(this.state.comentario);
    this.setState({comentario:''});
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


  render() {
    if(this.props.foto){
    return (
      <div className="row fixed-container">
      <div className="col-xs-1"></div>
      <div className={"comentario-container col-xs-10 "+this.props.show}>

      <div className="col-xs-12">
        <div className="row">

        <div className="col-xs-12">
        <img src={this.getUrl()} alt={this.props.foto.id}/>
        </div>

        {this.props.comentarios.map((comentario) =>{
          return <div key={comentario._id}>{comentario.comentario}</div>
        })}


        <div className="col-xs-12">
        <h3>Un nuevo comentario</h3>
        </div>
        </div>
        <form>

          <div className="form-group row">
            <div className="col-xs-4">
              <label>Comentario:</label>
            </div>
            <div className="col-xs-8">
              <input type="text" placeholder="Su comentario"
                onChange={(event) => {this.setText(event)}}/>
            </div>
          </div>


            <div className="col-sm-2 col-xs-4" >
              <button className="btn btn-primary" onClick={(event) => {this.agregar(event)}}>Aceptar</button>
            </div>
            <div className="col-sm-2 col-xs-4">
                <button className="btn btn-danger" onClick={(event) => {event.preventDefault(); this.props.modalAction('hidden')}}>Cerrar</button>
              </div>

        </form>
        </div>
      </div>
        <div className="col-xs-1"></div>
      </div>
    );
  }else{
  return (<div className={"comentario-container col-xs-10-offset-4 "+this.props.show}>No hay foto(?)</div>);
  }
  }
}

export default Comentarios;
