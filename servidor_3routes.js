var express = require('express');
var app = express(); // importamos express, >npm install express
var mongoose = require('mongoose'); // importamos mongoose, >npm install mongoose
var Grid = require('gridfs-stream');

var fs = require('fs');
var User = require('./documentstruct.js');

var routes = require('./routes/routes')
//mongoose.Promise = require('bluebird');
// mongoose's Promise library is deprecated, using es6's: 


var port = process.env.PORT || 8080;
app.use(express.static('public'));


//mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
var opts = { server: { auto_reconnect: true }, user: 'admin', pass: 'castellano100' };
db = mongoose.connect('ds149820.mlab.com', 'search_engine_3', 49820, opts, function(err){
	if(!err){
		console.log('Conectado a la base de datos');
		} else {
		console.log('Error al conectaros :' + err );
	}
});

app.get('/',routes);
app.get('/nuevo',routes);
app.get('/image',routes);

app.listen(port,function(){
	console.log('Escuchando el puerto ' + port );
});