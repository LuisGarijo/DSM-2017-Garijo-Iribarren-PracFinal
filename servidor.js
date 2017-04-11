var express = require('express');
var app = express(); // importamos express, >npm install express
var mongoose = require('mongoose'); // importamos mongoose, >npm install mongoose

var port = process.env.PORT || 8080;
app.use(express.static('public'));

var Schema = mongoose.Schema;  // modelo no relacional de lo que vamos a almacenar en la base de datos 
var Dato = new Schema ({ // creamos el ORM (el modelo de los datos) tipo JSON
	name: String,
	info: String
 });
var Dato = mongoose.model('Dato', Dato);

mongoose.connect('mongodb://admin:castellano100@ds149820.mlab.com:49820/search_engine_3', function(err){
	if(!err){
		console.log('Conectado a la base de datos');
	} else {
		throw err;
	}
});

	
app.get('/nuevo', function(request,response){
	var datos = new Dato(
		{
			name: 'Koldo',
			info: 'la hostia Patxi'
		}
	);
	datos.save(function(err){
		if(!err){
			response.write('Creando registro');
			response.end();
		}else{
			response.write('Error al crear registro');
			response.end();
		}
	});
 });

app.get('/', function(request, response){
	Dato.find({}, function(err, docs){
		response.send(docs);
	})

});

app.listen(port,function(){
	console.log('Escuchando el puerto' + port );
});