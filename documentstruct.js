var mongoose = require('mongoose');
var Schema = mongoose.Schema;  // modelo no relacional de lo que vamos a almacenar en la base de datos 

// STRUCTURE FOR DIFFERENT ORM(OBJECT RELATIONAL MAPPING)

// FOR USERS
var User = new Schema ({ // creamos el ORM (el modelo de los datos) tipo JSON
	firstname: String,
	lastname: String,
	birthdate:  { 
		type: String,
		format: Date
		 }
 });
//var User = mongoose.model('User', User);
//EXPORT THE USER MODEL
module.exports = mongoose.model('User', User);

// FOR DOCUMENTS