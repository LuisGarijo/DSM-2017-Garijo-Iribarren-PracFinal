var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../documentstruct.js');

var fs = require('fs'); 
var Grid = require('gridfs-stream');

Grid.mongo = mongoose.mongo;
// mongoose.connect('mongodb://admin:castellano100@ds149820.mlab.com:49820/search_engine_3');
var conn = mongoose.connection;

router.route('/')
	.get(function(request,response){
		console.log('Entramos en get("/"..');

	User.find({}, function(err, docs){
		if(!err){
			response.send(docs);
		} else {
			console.log('En get "/" error al buscar:'+ err);
		}
	});

});
		
router.route('/nuevo')
	.get(function(request,response){
		var oneuser = new User(
		{
			firstname: "Pedro",
			lastname: "Picapiedra",
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

router.route('/image')
	.get(function(request,response){
				// conn.once('open', function () {
		    console.log('open');
		    var gfs = Grid(conn.db);
		 
		    // streaming to gridfs
		    //filename to store in mongodb
		    var writestream = gfs.createWriteStream({
		        filename: 'imagen2.jpeg'
		    });

		    fs.createReadStream('imagen2.jpeg').
		    	pipe(writestream).
		 			on('close', function (file) {
		        // do something with `file`
		        console.log(file.filename + ' Written To DB');
		        response.end();
		    });

			    //write content to file system
			// var fs_write_stream = fs.createWriteStream('imagen2.jpeg');
			 
			// //read from mongodb
			// var readstream = gfs.createReadStream({
			//      filename: 'imagen2.jpeg'
			// });
			// readstream.pipe(fs_write_stream);
			// fs_write_stream.on('close', function () {
			//      console.log('file has been written fully!');
			// });
		// });

	});
	
module.exports = router;