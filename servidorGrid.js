var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://admin:castellano100@ds149820.mlab.com:49820/search_engine_3');
var conn = mongoose.connection;
 
var fs = require('fs');
 
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
 
conn.once('open', function () {
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
});

