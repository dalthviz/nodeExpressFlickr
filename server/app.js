// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flickr = require("flickrapi");
const fs = require("fs");
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Assumes that there are two files containing the keys
// $PROJECT_HOME/server/api_key.txt
// $PROJECT_HOME/server/api_secret.txt
function getApiKeys(callback, errorcallback) {
	fs.readFile(path.resolve(__dirname,"./api_key.txt"), "utf-8", (err, api_key) => {
		if (err) {
			errorcallback(err);
			return;
		}
		fs.readFile(path.resolve(__dirname,"./api_secret.txt"), "utf-8",(err, api_secret) => {
			if (err) {
				errorcallback(err);
				return;
			}
			callback(api_key.trim(), api_secret.trim());
		});
	});
}

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Searches Flickr for a specific query
app.get('/flickr/:query', function (req, res) {
	console.log("Flickr call query=" + req.params['query'] );
	getApiKeys((api_key, api_secret) => {
		const Flickr = require("flickrapi"),
	    flickrOptions = {
	      api_key: api_key,
	      secret: api_secret
	    };
	    console.log(api_key);
	    console.log(api_secret);
		Flickr.tokenOnly(flickrOptions, function(error, flickr) {
			console.log("tokenOnly");
			if (error) {
				res.send(error);
				return;
			}
		  // we can now use "flickr" as our API object,
		  // but we can only call public methods and access public data
		  flickr.photos.search({
		  	safe:1,
		  	sort:"relevance",
		  	text:req.params["query"]
		  }, (err, data) => {
		  	if (err) res.send(err);
		  	console.log("Got flickr data sending it");
		  	res.send(data);
		  });
		});

	}, (err) => {
		console.log(err);
		res.send("Error!");
	})
});

var url = 'mongodb://boiler:boilerplate@ds123410.mlab.com:23410/boilerplate';

//--------------Funciones de peticiones
/* GET comentarios*/
app.get('/comentarios', function (req, res) {
	getComentarios(function (comentarios) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(comentarios));
	});
});

/*Método que da los comentarios*/
function getComentarios(callback) {
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		var f = {};
		var comentariosCol = db.collection("comentarios");
		comentariosCol.find(f).toArray(function(err, data){
			assert.equal(null, err);
			callback(data);
		});
	});
}

app.get('/fotos/:id/comentarios', function (req, res) {
	var id_foto = req.params.id;
	getComentariosFoto(id_foto, function (comentarios) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(comentarios));
	});
});

function getComentariosFoto(id_foto, callback){
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		var f = {'id_foto': id_foto};
		var comentariosCol = db.collection("comentarios");
		comentariosCol.find(f).toArray(function(err, data){
			assert.equal(null, err);
			callback(data);
		});
	});
}


/* POST de un comentario*/
app.post('/comentarios', function (req, res) {
	try{
		var comentario = req.body;
		console.log(comentario);
		addComentario(comentario, function(response){
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(response));
		});
	}catch(e){
		res.send(e);
	}
});
// probado: bien!

function addComentario( comentario, callback){
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		var usersCol = db.collection("comentarios");
		usersCol.insert(comentario, function(err, status){
			assert.equal(null, err);
			callback(status);
		});
	});
}


/* DELETE un comentario*/
app.delete('/comentarios/:id', function(req, res){
	try{
		var id_comentario = ObjectId(req.params.id);
		deleteComentario(id_comentario, function(response){
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(response));
		});
	}catch(e){
		res.send(e);
	}
});

function deleteComentario(id_comentario, callback){
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		var usersCol = db.collection("comentarios");
		var q = {'_id': id_comentario};
		usersCol.remove(q, function(err, status){
			assert.equal(null, err);
			callback(status);
		});
	});
}


// Always return the main index.html, so react-router render the route in the client
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


module.exports = app;
