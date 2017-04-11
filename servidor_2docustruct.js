var express = require('express');
var app = express(); // importamos express, >npm install express
var mongoose = require('mongoose'); // importamos mongoose, >npm install mongoose

var User = require('./documentstruct.js');

var port = process.env.PORT || 8080;
app.use(express.static('public'));



mongoose.connect('mongodb://admin:castellano100@ds149820.mlab.com:49820/search_engine_3', function(err){
	if(!err){
		console.log('Conectado a la base de datos');
	} else {
		throw err;
	}
});

	
app.get('/nuevo', function(request,response){
	var oneuser = new User(
		{
			firstname: "Luis",
			lastname: "Garijo",
			birthdate: "22-02-1732"
		}
	);
	console.log('Prueba');
	oneuser.save(function(err){
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

	console.log('Entramos en get("/"..');

	User.find({}, function(err, docs){
		if(!err){
			response.send(docs);
		} else {
			console.log('En get "/" error al buscar:'+ err);
		}
	})

});

app.listen(port,function(){
	console.log('Escuchando el puerto ' + port );
});